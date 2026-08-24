import { FigmaConnection } from '../../domain/entities/figma-connection.entitie';

export class FigmaConnectionResponseDto {
  connectionId: string;
  userId: string;
  name: string;
  personalAccessToken: string;
  createdAt: Date;

  static fromEntity(entity: FigmaConnection): FigmaConnectionResponseDto {
    const dto = new FigmaConnectionResponseDto();
    dto.connectionId = entity.connectionId;
    dto.userId = entity.userId;
    dto.name = entity.name;
    dto.personalAccessToken = entity.personalAccessToken;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}