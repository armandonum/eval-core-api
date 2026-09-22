import { UsabilityEvent } from '../entities/usability-event.entity';



export interface  IUsabilityEventRepository {
   create(event: UsabilityEvent): Promise<UsabilityEvent>;

   findAll(): Promise<UsabilityEvent[]>;

   findById(id: string): Promise<UsabilityEvent | null>;

   findBySession(sessionId: string): Promise<UsabilityEvent[]>;

   update(
    id: string,
    event: Partial<UsabilityEvent>,
  ): Promise<UsabilityEvent>;

   delete(id: string): Promise<void>;
}