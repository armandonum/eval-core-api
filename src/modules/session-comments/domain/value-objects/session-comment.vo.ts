

export class CommentText {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('El comentario no puede estar vacío')
    }
    if (value.length > 5000) {
      throw new Error('El comentario no puede exceder los 5000 caracteres')
    }
  }

  getValue(): string {
    return this.value
  }
}