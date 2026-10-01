export class FigmaProject {
  constructor(
    public readonly projectId: string,
    public readonly createdBy: string,

    public fileKey: string,

    public projectName: string,

    public lastModified: Date,

    public version: string,

    public thumbnailUrl: string | null,

    public fetchedAt: Date,

    public rawJsonPath: string,

    public semesterId: string,
    
    public readonly createdAt: Date,
    public  publicUrl: string,

  ) {}

  update(
    fileKey: string,
    projectName: string,
    lastModified: Date,
    version: string,
    thumbnailUrl: string | null,
    rawJsonPath: string,
    publicUrl: string
  ) {
    this.fileKey = fileKey;
    this.projectName = projectName;
    this.lastModified = lastModified;
    this.version = version;
    this.thumbnailUrl = thumbnailUrl;
    this.rawJsonPath = rawJsonPath;
    this.publicUrl = publicUrl;

    this.fetchedAt = new Date();
  }
}