import { HeuristicFramework } from '../entities/heuristic-framework.entity';

export interface HeuristicFrameworkRepository {
  create(framework: HeuristicFramework): Promise<HeuristicFramework>;
  findAll(): Promise<HeuristicFramework[]>;
  findById(id: string): Promise<HeuristicFramework | null>;
  findByName(name: string): Promise<HeuristicFramework | null>;
  update(id: string, framework: Partial<HeuristicFramework>): Promise<HeuristicFramework>;
  delete(id: string): Promise<void>;
}
