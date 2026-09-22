// domain/entities/heatmap-event.entity.ts

export interface HeatmapEventProps {
  eventId: string
  sessionId: string
  projectId: string
  userId?: string | null
  eventType: 'click' | 'move' | 'scroll' | 'dwell' | 'resize'
  nodeId?: string | null
  screenIdentifier?: string | null
  xPct: number
  yPct: number
  viewportWidth: number
  viewportHeight: number
  scrollDepth?: number | null
  elementSelector?: string | null
  dwellMs?: number | null
  elapsedMsTotal: number
  eventTime: Date
  createdAt: Date
  userAgent?: string | null
  deviceType?: 'desktop' | 'mobile' | 'tablet' | null
  browser?: string | null
}

export class HeatmapEvent {
  private props: HeatmapEventProps

  private constructor(props: HeatmapEventProps) {
    this.props = props
  }

  static create(
    props: Omit<HeatmapEventProps, 'eventId' | 'createdAt' | 'eventTime'>,
  ): HeatmapEvent {
    return new HeatmapEvent({
      ...props,
      eventId: crypto.randomUUID(),
      eventTime: new Date(),
      createdAt: new Date(),
    })
  }

  static reconstitute(props: HeatmapEventProps): HeatmapEvent {
    return new HeatmapEvent(props)
  }

  get eventId(): string {
    return this.props.eventId
  }

  get sessionId(): string {
    return this.props.sessionId
  }

  get projectId(): string {
    return this.props.projectId
  }

  get userId(): string | null {
    return this.props.userId ?? null
  }

  get eventType(): string {
    return this.props.eventType
  }

  get nodeId(): string | null {
    return this.props.nodeId ?? null
  }

  get screenIdentifier(): string | null {
    return this.props.screenIdentifier ?? null
  }

  get xPct(): number {
    return this.props.xPct
  }

  get yPct(): number {
    return this.props.yPct
  }

  get viewportWidth(): number {
    return this.props.viewportWidth
  }

  get viewportHeight(): number {
    return this.props.viewportHeight
  }

  get scrollDepth(): number | null {
    return this.props.scrollDepth ?? null
  }

  get elementSelector(): string | null {
    return this.props.elementSelector ?? null
  }

  get dwellMs(): number | null {
    return this.props.dwellMs ?? null
  }

  get elapsedMsTotal(): number {
    return this.props.elapsedMsTotal
  }

  get eventTime(): Date {
    return this.props.eventTime
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get userAgent(): string | null {
    return this.props.userAgent ?? null
  }

  get deviceType(): string | null {
    return this.props.deviceType ?? null
  }

  get browser(): string | null {
    return this.props.browser ?? null
  }
}