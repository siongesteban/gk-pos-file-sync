import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './app.config';
import { AppService } from './app.service';
import { SqsModule } from './sqs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    SqsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
