import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for frontend
  app.enableCors({
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
