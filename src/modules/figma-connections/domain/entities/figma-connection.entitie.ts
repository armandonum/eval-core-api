export class FigmaConnection {
    constructor(
    public readonly connectionId: string,
    public readonly userId: string,
    public readonly name: string,
    public  personalAccessToken: string,
    public readonly createdAt: Date,
  ) {}


}
