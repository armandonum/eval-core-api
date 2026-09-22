import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';

export class LoginDto {
  @ApiProperty({
    
    example: "admin@uxlab.com",
    description: "Email del usuario",
  }
  )
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: "Admin123*",
    description: "Contraseña del usuario",
  }
  )
  @IsString()
  @IsNotEmpty()
  password!: string;
}