export type GazeEventType = 'raw' | 'fixation' | 'saccade';

export class GazeEvent {
  constructor(
    public readonly eventId: string,
    public sessionId: string,
    public elapsedMsTotal: number,
    public timestampReal: Date,
    public gazeX: number,
    public gazeY: number,
    public confidence: number,
    public viewportWidth: number,
    public viewportHeight: number,
    public nodeId: string | null,
    public eventType: GazeEventType,
    public durationMs: number,
    public readonly createdAt: Date,
  ) {}

  static create(
    sessionId: string,
    elapsedMsTotal: number,
    gazeX: number,
    gazeY: number,
    confidence: number,
    viewportWidth: number,
    viewportHeight: number,
    nodeId: string | null = null,
    eventType: GazeEventType = 'raw',
    durationMs: number = 0,
  ): GazeEvent {
    // Validaciones de negocio
    if (gazeX < 0 || gazeX > 1) {
      throw new Error('gazeX debe estar entre 0 y 1');
    }
    if (gazeY < 0 || gazeY > 1) {
      throw new Error('gazeY debe estar entre 0 y 1');
    }
    if (confidence < 0 || confidence > 1) {
      throw new Error('confidence debe estar entre 0 y 1');
    }

    return new GazeEvent(
      null as any,
      sessionId,
      elapsedMsTotal,
      new Date(),
      gazeX,
      gazeY,
      confidence,
      viewportWidth,
      viewportHeight,
      nodeId,
      eventType,
      durationMs,
      new Date(),
    );
  }

  /**
   * Verifica si el punto de mirada está dentro de un Área de Interés (AOI)
   */
  isInsideAOI(x1: number, y1: number, x2: number, y2: number): boolean {
    const xPct = this.gazeX * 100;
    const yPct = this.gazeY * 100;

    return xPct >= x1 && xPct <= x2 && yPct >= y1 && yPct <= y2;
  }

  /**
   * Convierte las coordenadas normalizadas a píxeles
   */
  toPixels(): { x: number; y: number } {
    return {
      x: Math.round(this.gazeX * this.viewportWidth),
      y: Math.round(this.gazeY * this.viewportHeight),
    };
  }
}