export class UsabilitySession {

  constructor(

    public readonly sessionId: string,

    public readonly proyectId: string,

    public readonly userId: string | null,
    
    public readonly taskId: string,

    public readonly fileKey: string,

    public readonly nodeIdInicial: string | null,

    public readonly taskDescription: string,

    public readonly startedAt: Date,

    public endedAt: Date | null,

    public durationSeconds: number | null,

    public status: string,

    public readonly deviceType: string,

    public readonly browser: string,

    public  faceVideoKey: string,

    public  screenVideKey: string,

    public readonly createdAt: Date,

    public updatedAt: Date,

    public evaluationType: string,

  ) {}

  finish(endDate: Date, faceVideoKey?: string, screenVideKey?: string) {

    this.endedAt = endDate

    this.durationSeconds = Math.floor(
      (endDate.getTime() - this.startedAt.getTime()) / 1000,
    )

    this.status = 'completed'

    this.faceVideoKey = faceVideoKey ?? ''

    this.screenVideKey = screenVideKey ?? ''

    this.updatedAt = new Date()
  }

  abandon(endDate: Date) {

    this.endedAt = endDate

    this.durationSeconds = Math.floor(
      (endDate.getTime() - this.startedAt.getTime()) / 1000,
    )

    this.status = 'abandoned'

    this.updatedAt = new Date()
  }

}