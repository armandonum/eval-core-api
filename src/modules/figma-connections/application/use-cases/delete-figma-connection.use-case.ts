import {
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import type { FigmaConnectionRepository } from '../../domain/interfaces/figma-connetion.repository'
import { INJECTION_TOKENS } from '../../../../shared/constants/injection-tokens';

@Injectable()
export class DeleteFigmaConnectionUseCase {
    constructor(
        @Inject(INJECTION_TOKENS.FIGMA_CONNECTION_REPOSITORY)
        private readonly repository: FigmaConnectionRepository,
    ) {}

    async execute(connectionId: string) {
        const connection = await this.repository.findById(connectionId);
        if (!connection) {
            throw new NotFoundException('Connection not found');
        }
        await this.repository.delete(connectionId);
    }
}