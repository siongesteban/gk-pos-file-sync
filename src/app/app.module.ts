import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { appConfig } from './app.config';
import { AppService } from './app.service';
import { SqsModule } from './sqs.module';
import { features, sqsHandlers } from '../features';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    SqsModule,
    CqrsModule,
  ],
  providers: [AppService, ...features, ...sqsHandlers],
})
export class AppModule {}
