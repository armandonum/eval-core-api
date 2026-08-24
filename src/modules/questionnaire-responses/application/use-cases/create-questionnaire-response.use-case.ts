import {
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { CreateQuestionnaireResponseDto } from '../dtos/create-questionnaire-response.dto';

import { QuestionnaireResponse } from '../../domain/entities/questionnaire-response.entity';
import type { QuestionnaireResponseRepository } from '../../domain/interfaces/questionnaire-response.repository';

import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class CreateQuestionnaireResponseUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.QUESTIONNAIRE_RESPONSE_REPOSITORY)
    private readonly repository: QuestionnaireResponseRepository,
  ) {}

  async execute(dto: CreateQuestionnaireResponseDto) {
    // 🔥 Validar que sessionId existe antes de buscar
    if (!dto.sessionId) {
      // Si no hay sessionId, no buscar respuesta existente
      const response = QuestionnaireResponse.create({
        responseId: randomUUID(),
        questionnaireId: dto.questionnaireId,
        participantId: dto.participantId,
        sessionId: null, // Guardar como null
      });

      return this.repository.create(response);
    }

    // Solo buscar si hay sessionId
    const existing = await this.repository.findByQuestionnaireParticipantSession(
      dto.questionnaireId,
      dto.participantId,
      dto.sessionId,
    );

    if (existing) {
      throw new ConflictException(
        'El participante ya tiene una respuesta para este cuestionario y sesión',
      );
    }

    const response = QuestionnaireResponse.create({
      responseId: randomUUID(),
      questionnaireId: dto.questionnaireId,
      participantId: dto.participantId,
      sessionId: dto.sessionId,
    });

    return this.repository.create(response);
  }
}