import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('API Usuarios')
    .setDescription('CRUD de usuarios - aprendizaje NestJS')
    .setVersion('1.0')
    .addBearerAuth() // si luego agregas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // ruta donde se sirve

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
