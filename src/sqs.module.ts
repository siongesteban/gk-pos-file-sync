import { Module } from '@nestjs/common';
import { SqsModule as NestSqsModule } from '@ssut/nestjs-sqs';
import { SQS } from '@aws-sdk/client-sqs';
import { AppConfig, AppConfigToken } from './app.config';
import { SqsNames } from './sqs-names';
import { DownloadMenuFileSqsHandler } from './download-menu-file.sqs-handler';

interface Queue {
  name: string;
  queueUrl: string;
  sqs: SQS;
}

@Module({
  imports: [
    NestSqsModule.registerAsync({
      inject: [AppConfigToken],
      useFactory: (appConfig: AppConfig) => {
        const { accessKeyId, secretAccessKey, region, accountId } =
          appConfig.aws;

        const sqs = new SQS({
          credentials: { accessKeyId, secretAccessKey },
          region,
        });

        const queues: Queue[] = Object.values(SqsNames).map((name) => ({
          sqs,
          name,
          queueUrl: `https://sqs.${region}.amazonaws.com/${accountId}/${name}`,
        }));

        return {
          consumers: queues,
        };
      },
    }),
  ],
  providers: [DownloadMenuFileSqsHandler],
})
export class SqsModule {}
