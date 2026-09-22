export class FigmaNode {
  constructor(
    public readonly nodeId: string,

    public readonly projectId: string,

    public parentNodeId: string | null,

    public name: string,

    public type: string,

    public depth: number,

    public isScreen: boolean,

    public componentId: string | null,

    public positionX: number | null,

    public positionY: number | null,

    public width: number | null,

    public height: number | null,

    public rawJson: Record<string, any>,

    public readonly createdAt: Date,

    public updatedAt: Date,
  ) {}

  update(
    parentNodeId: string | null,
    name: string,
    type: string,
    depth: number,
    isScreen: boolean,
    componentId: string | null,
    positionX: number | null,
    positionY: number | null,
    width: number | null,
    height: number | null,
    rawJson: Record<string, any>,
  ) {
    this.parentNodeId = parentNodeId;
    this.name = name;
    this.type = type;
    this.depth = depth;
    this.isScreen = isScreen;
    this.componentId = componentId;
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.rawJson = rawJson;

    this.updatedAt = new Date();
  }
}