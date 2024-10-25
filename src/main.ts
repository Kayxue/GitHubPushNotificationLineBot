import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.ts";
import "@std/dotenv/load";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
  app.enableCors()
	await app.listen(3000);
}
bootstrap();
