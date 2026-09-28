import { GazeEvent } from '../entities/gaze-event.entity';

export interface GazeHeatmapPoint {
  xPct: number;
  yPct: number;
  weight: number; // Cantidad de fijaciones en ese punto
}

export interface GazeEventRepository {
  create(event: GazeEvent): Promise<GazeEvent>;
  createBatch(events: GazeEvent[]): Promise<number>;
  findAll(): Promise<GazeEvent[]>;
  findById(id: string): Promise<GazeEvent | null>;
  findBySession(sessionId: string): Promise<GazeEvent[]>;
  findBySessionAndTimeRange(
    sessionId: string,
    startMs: number,
    endMs: number,
  ): Promise<GazeEvent[]>;
  findByNode(nodeId: string): Promise<GazeEvent[]>;
  getHeatmapData(
    sessionId: string,
    startMs?: number,
    endMs?: number,
    nodeId?: string,
  ): Promise<GazeHeatmapPoint[]>;
  countBySession(sessionId: string): Promise<number>;
  delete(id: string): Promise<void>;
  deleteBySession(sessionId: string): Promise<void>;
}

export const GAZE_EVENT_REPOSITORY = 'GAZE_EVENT_REPOSITORY';