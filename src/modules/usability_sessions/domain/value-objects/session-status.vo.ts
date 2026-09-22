import { BadRequestException } from '@nestjs/common'

export enum SessionStatusEnum {

  IN_PROGRESS = 'in_progress',

  COMPLETED = 'completed',

  ABANDONED = 'abandoned',

}

export class SessionStatus {

  constructor(
    private readonly value: SessionStatusEnum,
  ) {

    if (
      !Object.values(SessionStatusEnum).includes(value)
    ) {
      throw new BadRequestException(
        'Estado de sesión inválido',
      )
    }

  }

  getValue() {
    return this.value
  }

}