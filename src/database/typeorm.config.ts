import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfigAsync = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
    database: configService.get<string>('DB_DATABASE'),
    username: configService.get<string>('DB_USERNAME'),
    password: String(configService.get('DB_PASSWORD') ?? ''),
    schema: 'auth',
    autoLoadEntities: true,
    synchronize: false,
    logging: false,
    migrationsRun: false,

  }),
};