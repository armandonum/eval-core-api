// domain/entities/heatmap-image.entity.ts

export interface HeatmapImageProps {
  heatmapImageId: string
  projectId: string
  sessionId?: string | null  // 🔥 NUEVO
  nodeId: string
  eventType: string
  timeRangeStartMs?: number | null  // 🔥 NUEVO
  timeRangeEndMs?: number | null    // 🔥 NUEVO
  deviceType?: string | null
  minSessions?: number
  imageData?: Buffer | null
  imageUrl?: string | null
  generatedAt: Date
  generatedBy?: string | null
}

export class HeatmapImage {
  private props: HeatmapImageProps

  private constructor(props: HeatmapImageProps) {
    this.props = props
  }

  static create(
    props: Omit<HeatmapImageProps, 'heatmapImageId' | 'generatedAt'>,
  ): HeatmapImage {
    return new HeatmapImage({
      ...props,
      heatmapImageId: crypto.randomUUID(),
      generatedAt: new Date(),
    })
  }

  static reconstitute(props: HeatmapImageProps): HeatmapImage {
    return new HeatmapImage(props)
  }

  get heatmapImageId(): string {
    return this.props.heatmapImageId
  }

  get projectId(): string {
    return this.props.projectId
  }

  get sessionId(): string | null {  // 🔥 NUEVO
    return this.props.sessionId ?? null
  }

  get nodeId(): string {
    return this.props.nodeId
  }

  get eventType(): string {
    return this.props.eventType
  }



  get timeRangeStartMs(): number | null {  // 🔥 NUEVO
    return this.props.timeRangeStartMs ?? null
  }

  get timeRangeEndMs(): number | null {    // 🔥 NUEVO
    return this.props.timeRangeEndMs ?? null
  }

  get deviceType(): string | null {
    return this.props.deviceType ?? null
  }

  get minSessions(): number {
    return this.props.minSessions ?? 1
  }

  get imageData(): Buffer | null {
    return this.props.imageData ?? null
  }

  get imageUrl(): string | null {
    return this.props.imageUrl ?? null
  }

  get generatedAt(): Date {
    return this.props.generatedAt
  }

  get generatedBy(): string | null {
    return this.props.generatedBy ?? null
  }

  toJSON() {
  return {
    heatmapImageId: this.props.heatmapImageId,
    projectId: this.props.projectId,
    sessionId: this.props.sessionId ?? null,
    nodeId: this.props.nodeId,
    eventType: this.props.eventType,
    timeRangeStartMs: this.props.timeRangeStartMs ?? null,
    timeRangeEndMs: this.props.timeRangeEndMs ?? null,
    deviceType: this.props.deviceType ?? null,
    minSessions: this.props.minSessions ?? 1,
    imageData: this.props.imageData,
    imageUrl: this.props.imageUrl,
    generatedAt: this.props.generatedAt,
    generatedBy: this.props.generatedBy ?? null,
  }
}
}