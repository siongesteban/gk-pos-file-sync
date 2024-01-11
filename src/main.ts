import { NestFactory } from '@nestjs/core';
import { AppModule, AppConfig, AppConfigToken } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  try {
    const config = app.get<AppConfig>(AppConfigToken);
    await app.listen(config.port);
    console.clear();
    console.log('Ghost Kitchen - File Sync');
    console.log('\nPress Ctrl+C to exit.');
  } catch (error) {
    console.error('Failed to start.', error);
    process.exit(1);
  }
}
bootstrap();
