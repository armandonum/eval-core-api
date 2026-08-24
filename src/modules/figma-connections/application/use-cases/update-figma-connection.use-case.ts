import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { FigmaConnectionRepository } from '../../domain/interfaces/figma-connetion.repository';
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';
import type { UpdateFigmaConnectionDto } from '../dtos/update-figma-connection.dto';
import { FigmaConnection } from '../../domain/entities/figma-connection.entitie';

@Injectable()
export class UpdateFigmaConnectionUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.FIGMA_CONNECTION_REPOSITORY)
    private readonly repository: FigmaConnectionRepository,
  ) {}

  async execute(connectionId: string, dto: UpdateFigmaConnectionDto) {
    // findById ahora retorna null en vez de lanzar excepción (ver el
    // repositorio corregido más abajo), así que este check sí tiene efecto.
    const existing = await this.repository.findById(connectionId);
    if (!existing) {
      throw new NotFoundException('Figma connection not found');
    }

    // Reconstruir la entidad explícitamente (en vez de "...connection,
    // ...dto") evita perder el tipo FigmaConnection y deja claro qué
    // campo se está actualizando: normalmente solo personalAccessToken,
    // cuando el token anterior expiró.
    const updated = new FigmaConnection(
      existing.connectionId,
      existing.userId,
      dto.name ?? existing.name,
      dto.personalAccessToken ?? existing.personalAccessToken,
      existing.createdAt,
    );

    return this.repository.update(updated);
  }
}