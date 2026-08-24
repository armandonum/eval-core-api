// domain/entities/session-comment.entity.ts

export interface SessionCommentProps {
  commentId: string
  sessionId: string
  elapsedMsTotal: number
  text: string
  emotionLabel?: string | null
  authorId?: string | null
  createdAt: Date
  updatedAt: Date
}

export class SessionComment {
  // 🔥 Propiedades públicas directamente
  public commentId: string
  public sessionId: string
  public elapsedMsTotal: number
  public text: string
  public emotionLabel: string | null
  public authorId: string | null
  public createdAt: Date
  public updatedAt: Date

  private constructor(props: SessionCommentProps) {
    // 🔥 Asignar directamente a this
    this.commentId = props.commentId
    this.sessionId = props.sessionId
    this.elapsedMsTotal = props.elapsedMsTotal
    this.text = props.text
    this.emotionLabel = props.emotionLabel ?? null
    this.authorId = props.authorId ?? null
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: Omit<SessionCommentProps, 'createdAt' | 'updatedAt'>): SessionComment {
    return new SessionComment({
      ...props,
      emotionLabel: props.emotionLabel ?? null,
      authorId: props.authorId ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  static reconstitute(props: SessionCommentProps): SessionComment {
    return new SessionComment(props)
  }

  // 🔥 Ya no necesitas getters, puedes acceder directamente

  // Métodos de negocio
  updateText(text: string): void {
    if (!text || text.trim().length === 0) {
      throw new Error('El comentario no puede estar vacío')
    }
    this.text = text.trim()
    this.updatedAt = new Date()
  }

  updateMetadata( emotionLabel?: string | null): void {
    if (emotionLabel !== undefined) this.emotionLabel = emotionLabel
    this.updatedAt = new Date()
  }

  // 🔥 Método para serializar
  toJSON() {
    return {
      commentId: this.commentId,
      sessionId: this.sessionId,
      elapsedMsTotal: this.elapsedMsTotal,
      text: this.text,
      emotionLabel: this.emotionLabel,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}