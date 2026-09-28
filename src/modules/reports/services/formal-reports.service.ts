import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Injectable()
export class ReportsService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  // ============================================================
  // D1) Pre/Post unificado
  // ============================================================
  async getPrePostReport(projectId: string, semesterId?: string) {
    const query = `
      SELECT
        q.type AS questionnaire_type,
        qq.order_index AS question_order,
        qq.question_text AS question,
        qq.question_type AS answer_type,
        qq.scale_min,
        qq.scale_max,
        COUNT(DISTINCT qr.participant_id) AS total_users,
        ROUND(AVG(qa.scale_value)::numeric, 2) AS avg_scale,
        COUNT(CASE WHEN qa.boolean_value = TRUE THEN 1 END) AS count_true,
        COUNT(CASE WHEN qa.boolean_value = FALSE THEN 1 END) AS count_false,
        COUNT(CASE WHEN qa.is_not_applicable = TRUE THEN 1 END) AS count_na,
        COUNT(CASE WHEN qa.answer_text IS NOT NULL THEN 1 END) AS count_text_answers
      FROM usability.questionnaires q
      JOIN usability.questionnaire_questions qq ON qq.questionnaire_id = q.questionnaire_id
      LEFT JOIN usability.questionnaire_responses qr ON qr.questionnaire_id = q.questionnaire_id
      LEFT JOIN usability.question_answers qa ON qa.response_id = qr.response_id
        AND qa.question_id = qq.question_id
      WHERE q.project_id = $1
      GROUP BY q.type, qq.order_index, qq.question_text, qq.question_type, qq.scale_min, qq.scale_max
      ORDER BY q.type, qq.order_index;
    `
    return this.dataSource.query(query, [projectId])
  }

  // ============================================================
  // f) Hallazgos por requerimiento
  // ============================================================
  async getFindingsByRequirement(projectId: string) {
    const query = `
      SELECT
        pr.code AS requirement_code,
        pr.title AS requirement_title,
        COUNT(f.finding_id) AS total_findings,
        COUNT(CASE WHEN f.severity = 'critical' THEN 1 END) AS critical,
        COUNT(CASE WHEN f.severity = 'high' THEN 1 END) AS high,
        COUNT(CASE WHEN f.severity = 'medium' THEN 1 END) AS medium,
        COUNT(CASE WHEN f.severity = 'low' THEN 1 END) AS low,
        COUNT(CASE WHEN f.status = 'resolved' THEN 1 END) AS resolved,
        COUNT(CASE WHEN f.textual_sentiment IN ('Frustración', 'Confusión', 'Rechazo') THEN 1 END) AS negative_sentiments,
        COUNT(CASE WHEN f.emotion_inferred IN ('frustration', 'angry') THEN 1 END) AS negative_emotions
      FROM usability.project_requirements pr
      LEFT JOIN usability.tasks t ON t.requirement_id = pr.requirement_id
      LEFT JOIN usability.findings f ON f.task_id = t.task_id
      WHERE pr.project_id = $1
      GROUP BY pr.requirement_id, pr.code, pr.title
      ORDER BY total_findings DESC;
    `
    return this.dataSource.query(query, [projectId])
  }

  // ============================================================
  // g) Hallazgos por flujo
  // ============================================================
  async getFindingsByFlow(projectId: string) {
    const query = `
      SELECT
        fl.flow_id,
        fl.name AS flow_name,
        t.title AS task_title,
        COUNT(DISTINCT f.finding_id) AS total_findings,
        COUNT(DISTINCT fe.session_id) AS sessions_evaluated,
        ROUND(AVG(fe.pasos_completados::numeric / NULLIF(fe.pasos_totales, 0) * 100), 1) AS completion_rate,
        ROUND(AVG(fe.tiempo_total_ms) / 1000.0, 1) AS avg_time_sec,
        SUM(fe.fallos) AS total_failures,
        COUNT(CASE WHEN f.severity = 'critical' THEN 1 END) AS critical_findings
      FROM usability.flow fl
      LEFT JOIN usability.tasks t ON t.task_id = fl.task_id
      LEFT JOIN usability.flow_evaluations fe ON fe.flow_id = fl.flow_id
      LEFT JOIN usability.findings f ON f.flow_id = fl.flow_id
      WHERE fl.project_id = $1
      GROUP BY fl.flow_id, fl.name, t.title
      ORDER BY total_findings DESC;
    `
    return this.dataSource.query(query, [projectId])
  }

  // ============================================================
  // h) Hallazgos por interfaz (pantalla)
  // ============================================================
  async getFindingsByScreen(projectId: string) {
    const query = `
      SELECT
        fn.node_id,
        fn.name AS screen_name,
        fn.type AS node_type,
        COUNT(f.finding_id) AS total_findings,
        COUNT(CASE WHEN f.severity = 'critical' THEN 1 END) AS critical,
        COUNT(CASE WHEN f.severity = 'high' THEN 1 END) AS high,
        COUNT(CASE WHEN f.emotion_inferred IN ('frustration', 'angry', 'confusion') THEN 1 END) AS negative_emotions,
        COUNT(CASE WHEN f.textual_sentiment = 'Confusión' THEN 1 END) AS confusion_count,
        COUNT(CASE WHEN f.textual_sentiment = 'Frustración' THEN 1 END) AS frustration_count
      FROM usability.figma_nodes fn
      LEFT JOIN usability.findings f ON f.node_id = fn.node_id
      WHERE fn.project_id = $1
        AND fn.is_screen = TRUE
      GROUP BY fn.node_id, fn.name, fn.type
      HAVING COUNT(f.finding_id) > 0
      ORDER BY total_findings DESC;
    `
    return this.dataSource.query(query, [projectId])
  }

  // ============================================================
  // i) Hallazgos por elemento UI
  // ============================================================
  async getFindingsByUiElement(projectId: string) {
    const query = `
      SELECT
        fn.node_id,
        fn.name AS element_name,
        fn.type AS element_type,
        COUNT(f.finding_id) AS total_findings,
        COUNT(CASE WHEN f.severity IN ('critical', 'high') THEN 1 END) AS severe_findings,
        STRING_AGG(DISTINCT f.type, ', ') AS finding_types
      FROM usability.figma_nodes fn
      JOIN usability.findings f ON f.node_id = fn.node_id
      WHERE fn.project_id = $1
        AND fn.type IN ('INSTANCE', 'COMPONENT', 'FRAME', 'GROUP')
        AND fn.is_screen = FALSE
      GROUP BY fn.node_id, fn.name, fn.type
      ORDER BY total_findings DESC
      LIMIT 50;
    `
    return this.dataSource.query(query, [projectId])
  }

  // ============================================================
  // j) Interacciones críticas
  // ============================================================
  async getCriticalInteractions(projectId: string, sessionId?: string) {
    const params: any[] = [projectId]
    let sessionFilter = ''

    if (sessionId) {
      sessionFilter = ' AND f.session_id = $2'
      params.push(sessionId)
    }

    const query = `
      SELECT
        f.finding_id,
        f.description,
        f.severity,
        f.emotion_inferred,
        f.textual_sentiment,
        f.frequency,
        f.node_id,
        fn.name AS screen_name,
        CASE
          WHEN f.severity = 'critical' THEN 'Severidad crítica'
          WHEN f.emotion_inferred IN ('angry', 'frustration') THEN 'Emoción negativa fuerte'
          WHEN f.textual_sentiment IN ('Frustración', 'Rechazo') THEN 'Sentimiento negativo'
          WHEN f.frequency >= 3 THEN 'Recurrencia alta'
          ELSE 'Combinación'
        END AS criticality_reason
      FROM usability.findings f
      LEFT JOIN usability.figma_nodes fn ON fn.node_id = f.node_id
      WHERE f.evaluation_id = $1
        AND (
          f.severity IN ('critical', 'high')
          OR f.emotion_inferred IN ('angry', 'frustration')
          OR f.textual_sentiment IN ('Frustración', 'Rechazo', 'Confusión')
          OR f.frequency >= 3
        )
        ${sessionFilter}
      ORDER BY
        CASE f.severity
          WHEN 'critical' THEN 1
          WHEN 'high' THEN 2
          WHEN 'medium' THEN 3
          ELSE 4
        END,
        f.frequency DESC
      LIMIT 100;
    `
    return this.dataSource.query(query, params)
  }

  // ============================================================
  // m) Afectivo por tarea
  // ============================================================
  async getAffectiveByTask(projectId: string) {
    const query = `
      WITH sessions_by_task AS (
        SELECT
          s.session_id,
          s.task_id,
          s.duration_seconds
        FROM usability.usability_sessions s
        WHERE s.project_id = $1
      ),
      emotions_by_task AS (
        SELECT
          sbt.task_id,
          er.dominant_emotion,
          COUNT(er.reading_id) AS emotion_count
        FROM sessions_by_task sbt
        JOIN usability.emotion_readings er ON er.session_id = sbt.session_id
        GROUP BY sbt.task_id, er.dominant_emotion
      ),
      sentiments_by_task AS (
        SELECT
          sbt.task_id,
          ts.ux_label,
          COUNT(ts.sentiment_id) AS sentiment_count,
          STRING_AGG(DISTINCT ts.text, ' | ') AS comments
        FROM sessions_by_task sbt
        JOIN usability.text_sentiments ts ON ts.session_id = sbt.session_id
        WHERE ts.ux_label <> 'Neutral'
        GROUP BY sbt.task_id, ts.ux_label
      )
      SELECT
        t.task_id,
        t.title AS task_title,
        t.description AS task_description,
        t.order_index,
        -- Emociones dominantes
        (SELECT jsonb_object_agg(dominant_emotion, emotion_count)
         FROM emotions_by_task ebt
         WHERE ebt.task_id = t.task_id) AS emotions_breakdown,
        -- Sentimientos dominantes
        (SELECT jsonb_object_agg(ux_label, sentiment_count)
         FROM sentiments_by_task sbt
         WHERE sbt.task_id = t.task_id) AS sentiments_breakdown,
        -- Comentarios asociados
        (SELECT STRING_AGG(comments, ' | ')
         FROM sentiments_by_task sbt
         WHERE sbt.task_id = t.task_id) AS user_comments,
        -- Métricas
        (SELECT COUNT(DISTINCT session_id)
         FROM sessions_by_task
         WHERE task_id = t.task_id) AS sessions_count
      FROM usability.tasks t
      WHERE t.project_id = $1
      ORDER BY t.order_index;
    `
    return this.dataSource.query(query, [projectId])
  }

  // ============================================================
  // n) Sentimientos + hallazgo vinculado
  // ============================================================
  async getSentimentsWithFindings(projectId: string) {
    const query = `
      SELECT
        ts.sentiment_id,
        ts.text AS user_comment,
        ts.ux_label AS sentiment_label,
        ts.confidence,
        ts.elapsed_ms_total,
        CASE
          WHEN ts.ux_label = 'Confusión' THEN 'Comprensión'
          WHEN ts.ux_label = 'Frustración' THEN 'Dificultad'
          WHEN ts.ux_label = 'Desconfianza' THEN 'Confianza / Feedback'
          WHEN ts.ux_label = 'Dificultad / esfuerzo' THEN 'Visibilidad'
          WHEN ts.ux_label = 'Satisfacción' THEN 'Organización visual'
          WHEN ts.ux_label = 'Interés / motivación' THEN 'Motivación'
          ELSE 'General'
        END AS ux_topic,
        -- Hallazgo vinculado (si existe)
        f.finding_id,
        f.description AS finding_description,
        f.severity AS finding_severity,
        f.type AS finding_type
      FROM usability.text_sentiments ts
      LEFT JOIN usability.findings f ON f.user_comment_id = ts.sentiment_id
      JOIN usability.usability_sessions s ON s.session_id = ts.session_id
      WHERE s.project_id = $1
        AND ts.ux_label <> 'Neutral'
      ORDER BY ts.elapsed_ms_total;
    `
    return this.dataSource.query(query, [projectId])
  }

  // ============================================================
  // m2) Comentarios de expertos
  // ============================================================
  async getExpertComments(projectId: string) {
    const query = `
      SELECT
        ce.comment_id,
        ce.comment_type,
        ce.comment,
        ce.severity,
        ce.elapsed_ms_total,
        ce.node_id,
        fn.name AS screen_name,
        u.display_name AS evaluator_name,
        u.user_id AS evaluator_id,
        -- Hallazgos que referencian este comentario
        (SELECT COUNT(*)
         FROM usability.findings f
         WHERE f.expert_comment_id = ce.comment_id) AS linked_findings
      FROM usability.comment_experts ce
      LEFT JOIN usability.figma_nodes fn ON fn.node_id = ce.node_id
      LEFT JOIN auth.users u ON u.user_id = ce.author_id
      WHERE ce.project_id = $1
      ORDER BY
        ce.severity DESC NULLS LAST,
        ce.elapsed_ms_total;
    `
    return this.dataSource.query(query, [projectId])
  }

  // ============================================================
  // p) Centralizador
  // ============================================================
  async getCentralizerReport(projectId: string, sessionId?: string) {
    const params: any[] = [projectId]
    let sessionFilter = ''

    if (sessionId) {
      sessionFilter = ' AND f.session_id = $2'
      params.push(sessionId)
    }

    const query = `
      WITH base AS (
        SELECT * FROM usability.findings f WHERE f.evaluation_id = $1 ${sessionFilter}
      )
      SELECT
        (SELECT COUNT(*) FROM base) AS total_findings,
        (SELECT COUNT(*) FROM base WHERE severity = 'critical') AS critical,
        (SELECT COUNT(*) FROM base WHERE severity = 'high') AS high,
        (SELECT COUNT(*) FROM base WHERE severity = 'medium') AS medium,
        (SELECT COUNT(*) FROM base WHERE severity = 'low') AS low,
        (SELECT COUNT(*) FROM base WHERE type IN ('positive', 'opportunity')) AS positive,
        (SELECT COUNT(*) FROM base WHERE status = 'resolved') AS resolved,
        (SELECT COUNT(*) FROM base WHERE textual_sentiment IS NOT NULL) AS with_sentiment,
        (SELECT COUNT(*) FROM base WHERE emotion_inferred IS NOT NULL) AS with_emotion,
        -- Pantalla más problemática
        (SELECT fn.name
         FROM base b
         LEFT JOIN usability.figma_nodes fn ON fn.node_id = b.node_id
         WHERE b.node_id IS NOT NULL
         GROUP BY fn.name
         ORDER BY COUNT(*) DESC
         LIMIT 1) AS worst_screen,
        -- Emoción dominante
        (SELECT dominant_emotion
         FROM usability.emotion_readings er
         JOIN usability.usability_sessions s ON s.session_id = er.session_id
         WHERE s.project_id = $1
         GROUP BY dominant_emotion
         ORDER BY COUNT(*) DESC
         LIMIT 1) AS dominant_emotion,
        -- Sentimiento dominante
        (SELECT ux_label
         FROM usability.text_sentiments ts
         JOIN usability.usability_sessions s ON s.session_id = ts.session_id
         WHERE s.project_id = $1 AND ts.ux_label <> 'Neutral'
         GROUP BY ux_label
         ORDER BY COUNT(*) DESC
         LIMIT 1) AS dominant_sentiment,
        -- Comentario de usuario más frecuente (sentimiento negativo)
        (SELECT text
         FROM usability.text_sentiments ts
         JOIN usability.usability_sessions s ON s.session_id = ts.session_id
         WHERE s.project_id = $1
           AND ts.ux_label IN ('Confusión', 'Frustración', 'Desconfianza', 'Rechazo')
         ORDER BY ts.confidence DESC
         LIMIT 1) AS top_user_comment,
        -- Comentario de experto más crítico
        (SELECT comment
         FROM usability.comment_experts
         WHERE project_id = $1
         ORDER BY severity DESC NULLS LAST
         LIMIT 1) AS top_expert_comment;
    `
    const rows = await this.dataSource.query(query, params)
    return rows[0] || {}
  }

  // ============================================================
  // Lista de proyectos del usuario
  // ============================================================
  async getMyProjects(userId: string) {
    const query = `
      SELECT DISTINCT
        fp.project_id,
        fp.project_name,
        fp.file_key,
        fp.thumbnail_url,
        (SELECT COUNT(*) FROM usability.usability_sessions s WHERE s.project_id = fp.project_id) AS sessions_count
      FROM usability.figma_projects fp
      LEFT JOIN usability.project_reviewers pr ON pr.project_id = fp.project_id
      LEFT JOIN public.semester_projects sp ON sp.project_id = fp.project_id
      LEFT JOIN public.semesters sem ON sem.semester_id = sp.semester_id
      WHERE fp.created_by = $1
        OR pr.user_id = $1
      ORDER BY fp.project_name;
    `
    return this.dataSource.query(query, [userId])
  }
}