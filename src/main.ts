import { NestFactory } from '@nestjs/core';
import { AppConfig, AppConfigToken } from './app.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  try {
    const config = app.get<AppConfig>(AppConfigToken);
    await app.listen(config.port);
    console.log('Ghost Kitchen - File Sync');
  } catch (error) {
    console.error('Failed to start.');
    process.exit(1);
  }
}
bootstrap();
