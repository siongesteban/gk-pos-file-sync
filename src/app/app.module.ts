import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { appConfig } from './app.config';
import { AppService } from './app.service';
import { SqsModule } from './sqs.module';
import { features, sqsHandlers, schedules } from '../features';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    ScheduleModule.forRoot(),
    SqsModule,
    CqrsModule,
  ],
  providers: [AppService, ...features, ...sqsHandlers, ...schedules],
})
export class AppModule {}
