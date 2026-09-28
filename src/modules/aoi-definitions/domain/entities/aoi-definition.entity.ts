export type AoiType = 'button' | 'input' | 'text' | 'image' | 'navigation' | 'other';

export class AoiDefinition {
  constructor(
    public readonly aoiId: string,
    public projectId: string,
    public taskId: string | null,
    public name: string,
    public description: string | null,
    public x1: number, // 0-100%
    public y1: number, // 0-100%
    public x2: number, // 0-100%
    public y2: number, // 0-100%
    public nodeId: string | null,
    public aoiType: AoiType,
    public createdBy: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    projectId: string,
    name: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    taskId: string | null = null,
    description: string | null = null,
    nodeId: string | null = null,
    aoiType: AoiType = 'button',
    createdBy: string | null = null,
  ): AoiDefinition {
    // Validaciones de negocio
    if (x1 < 0 || x1 > 100) throw new Error('x1 debe estar entre 0 y 100');
    if (y1 < 0 || y1 > 100) throw new Error('y1 debe estar entre 0 y 100');
    if (x2 < 0 || x2 > 100) throw new Error('x2 debe estar entre 0 y 100');
    if (y2 < 0 || y2 > 100) throw new Error('y2 debe estar entre 0 y 100');

    if (x1 >= x2) {
      throw new Error('x1 debe ser menor que x2');
    }
    if (y1 >= y2) {
      throw new Error('y1 debe ser menor que y2');
    }

    return new AoiDefinition(
      null as any,
      projectId,
      taskId,
      name,
      description,
      x1,
      y1,
      x2,
      y2,
      nodeId,
      aoiType,
      createdBy,
      new Date(),
      new Date(),
    );
  }

  update(
    name?: string,
    description?: string | null,
    x1?: number,
    y1?: number,
    x2?: number,
    y2?: number,
    nodeId?: string | null,
    aoiType?: AoiType,
    taskId?: string | null,
  ): void {
    if (name !== undefined) this.name = name;
    if (description !== undefined) this.description = description;
    if (x1 !== undefined) {
      if (x1 < 0 || x1 > 100) throw new Error('x1 debe estar entre 0 y 100');
      this.x1 = x1;
    }
    if (y1 !== undefined) {
      if (y1 < 0 || y1 > 100) throw new Error('y1 debe estar entre 0 y 100');
      this.y1 = y1;
    }
    if (x2 !== undefined) {
      if (x2 < 0 || x2 > 100) throw new Error('x2 debe estar entre 0 y 100');
      this.x2 = x2;
    }
    if (y2 !== undefined) {
      if (y2 < 0 || y2 > 100) throw new Error('y2 debe estar entre 0 y 100');
      this.y2 = y2;
    }
    if (nodeId !== undefined) this.nodeId = nodeId;
    if (aoiType !== undefined) this.aoiType = aoiType;
    if (taskId !== undefined) this.taskId = taskId;

    // Validar que las coordenadas sigan siendo coherentes
    if (this.x1 >= this.x2) {
      throw new Error('x1 debe ser menor que x2');
    }
    if (this.y1 >= this.y2) {
      throw new Error('y1 debe ser menor que y2');
    }

    this.updatedAt = new Date();
  }

  /**
   * Calcula el área del AOI en porcentaje (0-100)
   */
  getArea(): number {
    return (this.x2 - this.x1) * (this.y2 - this.y1);
  }

  /**
   * Verifica si un punto (en porcentaje) está dentro del AOI
   */
  containsPoint(xPct: number, yPct: number): boolean {
    return xPct >= this.x1 && xPct <= this.x2 && yPct >= this.y1 && yPct <= this.y2;
  }
}