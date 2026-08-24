import { UsabilitySession } from '../entities/usability-session.entity'

export const USABILITY_SESSION_REPOSITORY =
  'USABILITY_SESSION_REPOSITORY'

export interface UsabilitySessionRepository {

  create(
    session: UsabilitySession,
  ): Promise<UsabilitySession>

  findById(
    sessionId: string,
  ): Promise<UsabilitySession | null>

  findAll(): Promise<UsabilitySession[]>

  update(
    session: UsabilitySession,
  ): Promise<UsabilitySession>

  delete(
    sessionId: string,
  ): Promise<void>

}