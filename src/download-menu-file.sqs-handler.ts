import { Injectable, Logger } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import { Message } from '@aws-sdk/client-sqs';
import { SqsNames } from './sqs-names';

@Injectable()
export class DownloadMenuFileSqsHandler {
  private readonly logger = new Logger(DownloadMenuFileSqsHandler.name);

  @SqsMessageHandler(SqsNames.DOWNLOAD_MENU_FILE)
  async handleMessage(message: Message) {
    const body = JSON.parse(message.Body);
    console.log('Download Menu File:', JSON.stringify(body));
  }

  @SqsConsumerEventHandler(SqsNames.DOWNLOAD_MENU_FILE, 'processing_error')
  handleProcessingError(error: Error, message: Message) {
    this.logger.error({ data: { error, message } });
  }

  @SqsConsumerEventHandler(SqsNames.DOWNLOAD_MENU_FILE, 'error')
  handleError(error: Error, message: Message) {
    this.logger.error({ data: { error, message } });
  }
}
