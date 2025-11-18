import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// swagger
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  //create nestjs app
  const app = await NestFactory.create(AppModule);

  //swagger config
  const config = new DocumentBuilder()
      .setTitle('OoNt THA Microservice API')
      .setDescription(
          'Public Market (with products), cart, and orders API with db integration for take home assignment',
          )
      .setVersion('1.0')
      .build();

  // create swagger document
  const document = SwaggerModule.createDocument(app, config);



  // expose the swagger api doc at :3000/api
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
