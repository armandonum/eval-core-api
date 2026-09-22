import { BadRequestException } from '@nestjs/common';

export class EventTypeVO {
  private readonly value: string;

  private static readonly allowed = [
    'INITIAL_LOAD',
    'PRESENTED_NODE_CHANGED',
    'NEW_STATE',
    'MOUSE_PRESS_OR_RELEASE',
    'MOUSE_HOVER',
    'KEYBOARD_INPUT',
    'SCROLL',
    'UNKNOWN',
  ];

  constructor(value: string) {
    if (!EventTypeVO.allowed.includes(value)) {
      throw new BadRequestException(
        `Tipo de evento inválido: ${value}`,
      );
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}