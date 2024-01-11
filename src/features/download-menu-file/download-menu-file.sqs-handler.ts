import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import { Message } from '@aws-sdk/client-sqs';
import { SqsNames } from '../../app/sqs-names';
import { DownloadMenuFileCommmand } from './download-menu-file.command';

@Injectable()
export class DownloadMenuFileSqsHandler {
  constructor(private readonly commandBus: CommandBus) {}

  @SqsMessageHandler(SqsNames.DOWNLOAD_MENU_FILE)
  async handleMessage(message: Message) {
    const body = JSON.parse(message.Body);
    await this.commandBus.execute(
      new DownloadMenuFileCommmand(body.url, body.fileName),
    );
  }

  @SqsConsumerEventHandler(SqsNames.DOWNLOAD_MENU_FILE, 'processing_error')
  handleProcessingError(_, message: Message) {
    console.error(
      `Failed to download menu file: ${JSON.parse(message.Body).fileName}.`,
    );
  }

  @SqsConsumerEventHandler(SqsNames.DOWNLOAD_MENU_FILE, 'error')
  handleError(error: Error, message: Message) {
    console.error(DownloadMenuFileSqsHandler.name, {
      data: { error, message },
    });
  }
}
