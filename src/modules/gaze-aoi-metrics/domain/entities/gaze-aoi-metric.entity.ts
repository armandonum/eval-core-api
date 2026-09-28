export class GazeAoiMetric {
  constructor(
    public readonly metricId: string,
    public sessionId: string,
    public aoiName: string,
    public aoiX1: number, // 0-100%
    public aoiY1: number, // 0-100%
    public aoiX2: number, // 0-100%
    public aoiY2: number, // 0-100%
    public timeToFirstFixationMs: number, // TFF
    public fixationCount: number, // FC
    public totalFixationDurationMs: number, // TFD
    public fixationsBefore: number, // FB
    public percentageFixated: number, // % del tiempo en el AOI
    public nodeId: string | null,
    public readonly calculatedAt: Date,
  ) {}

  static create(
    sessionId: string,
    aoiName: string,
    aoiX1: number,
    aoiY1: number,
    aoiX2: number,
    aoiY2: number,
    timeToFirstFixationMs: number,
    fixationCount: number,
    totalFixationDurationMs: number,
    fixationsBefore: number,
    percentageFixated: number,
    nodeId: string | null = null,
  ): GazeAoiMetric {
    // Validaciones de negocio
    if (timeToFirstFixationMs < 0) {
      throw new Error('timeToFirstFixationMs no puede ser negativo');
    }
    if (fixationCount < 0) {
      throw new Error('fixationCount no puede ser negativo');
    }
    if (totalFixationDurationMs < 0) {
      throw new Error('totalFixationDurationMs no puede ser negativo');
    }
    if (fixationsBefore < 0) {
      throw new Error('fixationsBefore no puede ser negativo');
    }
    if (percentageFixated < 0 || percentageFixated > 100) {
      throw new Error('percentageFixated debe estar entre 0 y 100');
    }

    return new GazeAoiMetric(
      null as any,
      sessionId,
      aoiName,
      aoiX1,
      aoiY1,
      aoiX2,
      aoiY2,
      timeToFirstFixationMs,
      fixationCount,
      totalFixationDurationMs,
      fixationsBefore,
      percentageFixated,
      nodeId,
      new Date(),
    );
  }

  /**
   * Determina si el AOI fue "ignorado" (nadie lo miró)
   */
  isIgnored(): boolean {
    return this.fixationCount === 0 || this.percentageFixated < 5;
  }

  /**
   * Determina si el AOI fue "difícil de encontrar" (TFF alto)
   */
  isHardToFind(thresholdMs: number = 3000): boolean {
    return this.timeToFirstFixationMs > thresholdMs;
  }

  /**
   * Determina si el AOI generó confusión (muchas fijaciones)
   */
  isConfusing(threshold: number = 10): boolean {
    return this.fixationCount > threshold;
  }

  /**
   * Clasifica el nivel de atención en el AOI
   */
  getAttentionLevel(): 'none' | 'low' | 'medium' | 'high' {
    if (this.fixationCount === 0) return 'none';
    if (this.percentageFixated < 10) return 'low';
    if (this.percentageFixated < 30) return 'medium';
    return 'high';
  }
}