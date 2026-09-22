export class FlowClick {
  constructor(
    public readonly clickId: string,

    public readonly flowId: string,

    public orderIndex: number,

    public nodeId: string,

    public presentedNodeId: string | null,

    public readonly clickedAt: Date,
  ) {}

  update(
    orderIndex: number,
    nodeId: string,
    presentedNodeId: string | null,
  ) {
    this.orderIndex = orderIndex;
    this.nodeId = nodeId;
    this.presentedNodeId = presentedNodeId;
  }
}