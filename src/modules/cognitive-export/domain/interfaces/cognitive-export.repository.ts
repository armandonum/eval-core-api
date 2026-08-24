// domain/interfaces/cognitive-export.repository.ts
export interface IExportData {
  evaluation: {
    id: string;
    name: string;
    description: string;
    status: string;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
  };
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    orderIndex: number;
    status: string;
    userGoal?: string;
  }>;
  evaluators: Array<{
    id: string;
    userId: string;
    role: string;
    assignedAt: Date;
    completedAt: Date | null;
    notes?: string;
  }>;
  responses: Array<{
    taskTitle: string;
    evaluatorName: string;
    responseDescription: string;
    systemResponse: string;
    q1Answer: string;
    q1Reasoning: string;
    q2Answer: string;
    q2Reasoning: string;
    q3Answer: string;
    q3Reasoning: string;
    q4Answer: string;
    q4Reasoning: string;
    problemIdentified: string;
    designSuggestion: string;
    otherComments: string;
    timeSpentSeconds: number;
    success: boolean;
    responseStatus: string;
    responseCreatedAt: Date;
  }>;
}

export interface ICognitiveExportRepository {
  getExportData(evaluationId: string): Promise<IExportData>;
}