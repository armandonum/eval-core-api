import { HeuristicPrinciple } from '../entities/heuristic-principle.entity';

export interface HeuristicPrincipleRepository {
  create(principle: HeuristicPrinciple): Promise<HeuristicPrinciple>;
  findAll(): Promise<HeuristicPrinciple[]>;
  findAllByFramework(frameworkId: string): Promise<HeuristicPrinciple[]>;
  findById(id: string): Promise<HeuristicPrinciple | null>;
  findByCodeAndFramework(code: string, frameworkId: string): Promise<HeuristicPrinciple | null>;
  update(id: string, principle: Partial<HeuristicPrinciple>): Promise<HeuristicPrinciple>;
  delete(id: string): Promise<void>;
  deleteByFramework(frameworkId: string): Promise<void>;
}

