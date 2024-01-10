import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  try {
    await app.listen(3000);
    console.log('Ghost Kitchen - File Sync');
  } catch (error) {
    console.error('Failed to start.');
    process.exit(1);
  }
}
bootstrap();
