export interface FigmaFileStorage {

  save(
    fileKey: string,
    data: Buffer,
  ): Promise<string>;
}