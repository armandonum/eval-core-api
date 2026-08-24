import { BadRequestException } from '@nestjs/common'

export class FileKey {

  constructor(
    private readonly value: string,
  ) {

    if (!value?.trim()) {
      throw new BadRequestException(
        'FILE_KEY es obligatorio',
      )
    }

  }

  getValue() {
    return this.value
  }

}