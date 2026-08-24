import { FigmaConnection } from '../entities/figma-connection.entitie';

export interface FigmaConnectionRepository {
  create(connection: FigmaConnection): Promise<FigmaConnection>;
  update(connection: FigmaConnection): Promise<FigmaConnection>;
   
  findById(connectionId: string): Promise<FigmaConnection | null>;
  findByUser(userId: string): Promise<FigmaConnection[]>;
  delete(connectionId: string): Promise<void>;
}
