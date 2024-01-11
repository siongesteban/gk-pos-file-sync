import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import { Message } from '@aws-sdk/client-sqs';
import { SqsNames } from '../../app/sqs-names';
import { DownloadOrderFileCommmand } from './download-order-file.command';

@Injectable()
export class DownloadOrderFileSqsHandler {
  constructor(private readonly commandBus: CommandBus) {}

  @SqsMessageHandler(SqsNames.DOWNLOAD_ORDER_FILE)
  async handleMessage(message: Message) {
    const body = JSON.parse(message.Body);
    await this.commandBus.execute(new DownloadOrderFileCommmand(body.url));
  }

  @SqsConsumerEventHandler(SqsNames.DOWNLOAD_ORDER_FILE, 'processing_error')
  handleProcessingError(error: Error, message: Message) {
    console.error(DownloadOrderFileSqsHandler.name, {
      data: { error, message },
    });
  }

  @SqsConsumerEventHandler(SqsNames.DOWNLOAD_ORDER_FILE, 'error')
  handleError(error: Error, message: Message) {
    console.error(DownloadOrderFileSqsHandler.name, {
      data: { error, message },
    });
  }
}
