import { BadRequestException } from '@nestjs/common';

export class NormalizedEventTypeVO {
  private readonly value: string;

  private static readonly allowed = [
    'navegacion',
    'click',
    'interaccion',
    'carga',
    'otro',
  ];

  constructor(value: string) {
    if (!NormalizedEventTypeVO.allowed.includes(value)) {
      throw new BadRequestException(
        `Tipo normalizado inválido: ${value}`,
      );
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}