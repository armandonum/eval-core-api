export class Questionnaire {
  constructor(
    public readonly questionnaireId: string,
    public readonly projectId: string,
    public type: 'pretest' | 'posttest',
    public title: string,
    public description: string | null,
    public readonly createdAt?: Date,
  ) {}

  static create(params: { 
    projectId: string;
    type: 'pretest' | 'posttest';
    title: string;
    description?: string | null;
  }) {
    return new Questionnaire(
      crypto.randomUUID(),
      params.projectId,
      params.type,
      params.title,
      params.description || null,
    );
  }


  update(params: {
    type?: 'pretest' | 'posttest';
    title?: string;
    description?: string | null;
  }) {
    this.type = params.type ?? this.type;
    this.title = params.title ?? this.title;
    this.description = params.description ?? this.description;
  }
}