import { BadRequestException } from '@nestjs/common'

export enum DeviceTypeEnum {

  DESKTOP = 'desktop',

  MOBILE = 'mobile',

  TABLET = 'tablet',

}

export class DeviceType {

  constructor(
    private readonly value: DeviceTypeEnum,
  ) {

    if (
      !Object.values(DeviceTypeEnum).includes(value)
    ) {
      throw new BadRequestException(
        'Tipo de dispositivo inválido',
      )
    }

  }

  getValue() {
    return this.value
  }

}