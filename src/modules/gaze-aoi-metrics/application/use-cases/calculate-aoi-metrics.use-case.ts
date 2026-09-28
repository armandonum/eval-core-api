import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  GazeAoiMetricRepository,
  GAZE_AOI_METRIC_REPOSITORY,
} from '../../domain/interfaces/gaze-aoi-metric.repository';
import { GazeAoiMetric } from '../../domain/entities/gaze-aoi-metric.entity';
import { CalculateAoiMetricsDto } from '../dtos/calculate-aoi-metrics.dto';
import {
  GazeEventRepository,
  GAZE_EVENT_REPOSITORY,
} from '../../../gaze-events/domain/interfaces/gaze-event.repository';
import {
  AoiDefinitionRepository,
  AOI_DEFINITION_REPOSITORY,
} from '../../../aoi-definitions/domain/interfaces/aoi-definition.repository';
import {
  HeuristicEvaluationRepository,
} from '../../../heuristic-evaluations/domain/interfaces/heuristic-evaluation.repository';

/**
 * Algoritmo I-DT (Identification by Dispersion Threshold)
 * para agrupar puntos de mirada en fijaciones.
 */
interface Fixation {
  x: number;
  y: number;
  startMs: number;
  endMs: number;
  durationMs: number;
  eventCount: number;
}

@Injectable()
export class CalculateAoiMetricsUseCase {
  private readonly DISPERSION_THRESHOLD = 0.03; // 3% de dispersión
  private readonly MIN_FIXATION_DURATION_MS = 100; // Mínimo 100ms para ser fijación

  constructor(
    @Inject(GAZE_AOI_METRIC_REPOSITORY)
    private readonly metricRepository: GazeAoiMetricRepository,
    @Inject(GAZE_EVENT_REPOSITORY)
    private readonly gazeRepository: GazeEventRepository,
    @Inject(AOI_DEFINITION_REPOSITORY)
    private readonly aoiRepository: AoiDefinitionRepository,
  ) {}

  async execute(dto: CalculateAoiMetricsDto): Promise<{
    sessionId: string;
    aoiCount: number;
    metrics: GazeAoiMetric[];
  }> {
    // 1. Obtener todos los eventos de mirada de la sesión
    const gazeEvents = await this.gazeRepository.findBySessionAndTimeRange(
      dto.sessionId,
      dto.startMs ?? 0,
      dto.endMs ?? Number.MAX_SAFE_INTEGER,
    );

    if (gazeEvents.length === 0) {
      throw new NotFoundException(
        `No hay eventos de mirada para la sesión ${dto.sessionId}`,
      );
    }

    // 2. Agrupar puntos en fijaciones (I-DT)
    const fixations = this.detectFixations(gazeEvents);

    // 3. Obtener los AOIs de la sesión
    // Necesitamos el projectId del cual viene la sesión
    // Por simplicidad, cargamos todos los AOIs que correspondan por node_id
    const allAois = await this.aoiRepository.findAll();

    // 4. Para cada AOI, calcular métricas  
    const metrics: GazeAoiMetric[] = [];

    for (const aoi of allAois) {
      const aoiMetrics = this.calculateMetricsForAoi(
        dto.sessionId,
        aoi,
        fixations,
        gazeEvents.length,
      );
      metrics.push(aoiMetrics);
    }

    // 5. Guardar/actualizar en la BD
    const savedMetrics = await this.metricRepository.createBatch(metrics);

    return {
      sessionId: dto.sessionId,
      aoiCount: savedMetrics.length,
      metrics: savedMetrics,
    };
  }

  /**
   * Algoritmo I-DT para detectar fijaciones.
   * Agrupa puntos consecutivos cuya dispersión esté por debajo del umbral.
   */
  private detectFixations(events: any[]): Fixation[] {
    const fixations: Fixation[] = [];
    let currentGroup: any[] = [];

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const x = Number(event.gazeX);
      const y = Number(event.gazeY);

      if (currentGroup.length === 0) {
        currentGroup.push({ ...event, x, y });
        continue;
      }

      // Calcular dispersión del grupo actual + nuevo evento
      const testGroup = [...currentGroup, { ...event, x, y }];
      const dispersion = this.calculateDispersion(testGroup);

      if (dispersion <= this.DISPERSION_THRESHOLD) {
        // El nuevo evento está dentro del umbral, agregar al grupo
        currentGroup = testGroup;
      } else {
        // El nuevo evento rompe el grupo. Cerrar el grupo actual.
        if (currentGroup.length > 1) {
          const fixation = this.buildFixation(currentGroup);
          if (fixation.durationMs >= this.MIN_FIXATION_DURATION_MS) {
            fixations.push(fixation);
          }
        }
        // Empezar nuevo grupo
        currentGroup = [{ ...event, x, y }];
      }
    }

    // Cerrar el último grupo
    if (currentGroup.length > 1) {
      const fixation = this.buildFixation(currentGroup);
      if (fixation.durationMs >= this.MIN_FIXATION_DURATION_MS) {
        fixations.push(fixation);
      }
    }

    return fixations;
  }

  /**
   * Calcula la dispersión (distancia máxima entre puntos) de un grupo.
   */
  private calculateDispersion(group: any[]): number {
    if (group.length < 2) return 0;

    let maxDistance = 0;
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const dx = group[i].x - group[j].x;
        const dy = group[i].y - group[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > maxDistance) maxDistance = distance;
      }
    }
    return maxDistance;
  }

  /**
   * Construye una fijación a partir de un grupo de eventos.
   */
  private buildFixation(group: any[]): Fixation {
    const startMs = Number(group[0].elapsedMsTotal);
    const endMs = Number(group[group.length - 1].elapsedMsTotal);

    // Centro de la fijación (promedio)
    const avgX = group.reduce((s, e) => s + e.x, 0) / group.length;
    const avgY = group.reduce((s, e) => s + e.y, 0) / group.length;

    return {
      x: avgX,
      y: avgY,
      startMs,
      endMs,
      durationMs: endMs - startMs,
      eventCount: group.length,
    };
  }

  /**
   * Calcula las métricas para un AOI específico.
   */
  private calculateMetricsForAoi(
    sessionId: string,
    aoi: any,
    fixations: Fixation[],
    totalGazeEvents: number,
  ): GazeAoiMetric {
    const aoiX1 = Number(aoi.x1);
    const aoiY1 = Number(aoi.y1);
    const aoiX2 = Number(aoi.x2);
    const aoiY2 = Number(aoi.y2);

    // Convertir AOI a coordenadas normalizadas
    const aoiX1Norm = aoiX1 / 100;
    const aoiY1Norm = aoiY1 / 100;
    const aoiX2Norm = aoiX2 / 100;
    const aoiY2Norm = aoiY2 / 100;

    // 1. Identificar qué fijaciones caen dentro del AOI
    const fixationsInAoi: Fixation[] = [];
    let firstFixationInAoiIndex = -1;

    for (let i = 0; i < fixations.length; i++) {
      const f = fixations[i];
      const isInside =
        f.x >= aoiX1Norm &&
        f.x <= aoiX2Norm &&
        f.y >= aoiY1Norm &&
        f.y <= aoiY2Norm;

      if (isInside) {
        fixationsInAoi.push(f);
        if (firstFixationInAoiIndex === -1) {
          firstFixationInAoiIndex = i;
        }
      }
    }

    // 2. Calcular TFF (Time to First Fixation)
    const timeToFirstFixationMs =
      fixationsInAoi.length > 0
        ? fixationsInAoi[0].startMs - fixations[0].startMs
        : 0;

    // 3. Calcular FC (Fixation Count)
    const fixationCount = fixationsInAoi.length;

    // 4. Calcular TFD (Total Fixation Duration)
    const totalFixationDurationMs = fixationsInAoi.reduce(
      (sum, f) => sum + f.durationMs,
      0,
    );

    // 5. Calcular FB (Fixations Before)
    const fixationsBefore =
      firstFixationInAoiIndex === -1 ? 0 : firstFixationInAoiIndex;

    // 6. Calcular % fixated
    // Porcentaje = (tiempo mirando el AOI / tiempo total) * 100
    const totalSessionDuration =
      fixations.length > 0
        ? fixations[fixations.length - 1].endMs - fixations[0].startMs
        : 1;

    const percentageFixated =
      totalSessionDuration > 0
        ? (totalFixationDurationMs / totalSessionDuration) * 100
        : 0;

    return GazeAoiMetric.create(
      sessionId,
      aoi.name,
      aoiX1,
      aoiY1,
      aoiX2,
      aoiY2,
      timeToFirstFixationMs,
      fixationCount,
      totalFixationDurationMs,
      fixationsBefore,
      Number(percentageFixated.toFixed(2)),
      aoi.nodeId,
    );
  }
}