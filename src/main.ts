import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
   .setTitle('Booking Service API')
   .setDescription('An API to book photographers')
   .setVersion('1.0')
   .addBearerAuth()
   .build();

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
