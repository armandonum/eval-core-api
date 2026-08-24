import { Flow } from '../entities/flow.entity';

export interface FlowRepository {
  create(flow: Flow): Promise<Flow>;
  findById(flowId: string): Promise<Flow | null>;
  findAll(): Promise<Flow[]>;
  findAllByTask(taskId: string): Promise<Flow[]>;
  update(flow: Flow): Promise<Flow>;
  delete(flowId: string): Promise<void>;
} 