import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import appConfig from './config/app.config'
import databaseConfig from './config/database.config'
import { typeOrmConfigAsync } from './database/typeorm.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      load: [appConfig, databaseConfig],
    }),

    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
  ],
})
export class AppModule {}