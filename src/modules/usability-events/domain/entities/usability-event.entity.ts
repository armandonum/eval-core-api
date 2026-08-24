export class UsabilityEvent {
  constructor(
    public readonly event_id: string,
    public readonly session_id: string,
    public readonly event_type: string,
    public readonly event_type_normalizado: string,
    public readonly node_id: string | null,
    public readonly screen_name: string | null,
    public readonly elapsed_minute: number,
    public readonly elapsed_second: number,
    public readonly elapsed_ms_total: number,
    public readonly timestamp_real: Date,
    public readonly raw_payload: Record<string, any> | null,
  ) {}
}