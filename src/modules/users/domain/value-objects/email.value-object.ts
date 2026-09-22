import { BadRequestException } from '@nestjs/common';

export class Email {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new BadRequestException(`Email inválido: ${value}`);
    }
  }

  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  toJSON() {
    return this.value;
  }
}