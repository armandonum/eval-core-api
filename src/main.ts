import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ─── Swagger ───────────────────────────────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Eval Core API')
    
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Desarrollo local')
    .addServer('https://api.midominio.com', 'Producción')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Ingresa tu JWT access token: Bearer <token>',
        in: 'header',
      },
      'access-token', 
    )
   
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,       // guarda el token entre recargas
      tagsSorter: 'alpha',              // ordena los tags A-Z
      operationsSorter: 'alpha',        // ordena los endpoints A-Z dentro de cada tag
      docExpansion: 'none',             // colapsa todos los endpoints por defecto
      filter: true,                     // activa la búsqueda por texto
      showRequestDuration: true,        // muestra el tiempo de respuesta
    },
    customSiteTitle: 'Eval Core - API Docs',
    // Opcional: reemplaza con tu logo
    // customfavIcon: 'https://midominio.com/favicon.ico',
    // customCssUrl: '/swagger-custom.css',
  });

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📚 Swagger docs en http://localhost:${port}/docs`);
}

bootstrap();
