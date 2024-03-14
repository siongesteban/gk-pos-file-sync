import fsPromises from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import { Inject, OnModuleInit } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppConfig, AppConfigToken } from '../../app';
import { FileDownloadError, downloadFile } from '../../utils';
import { DownloadOrderFileCommmand } from './download-order-file.command';

@CommandHandler(DownloadOrderFileCommmand)
export class DownloadOrderFileHandler
  implements ICommandHandler<DownloadOrderFileCommmand>, OnModuleInit
{
  private readonly folderPath: string;

  constructor(
    @Inject(AppConfigToken)
    private readonly appConfig: AppConfig,
  ) {
    this.folderPath = path.resolve(this.appConfig.downloadFolder, 'orders');
  }

  async onModuleInit() {
    // Pre-create download path for the file.
    if (!fs.existsSync(this.folderPath)) {
      await fsPromises.mkdir(this.folderPath, { recursive: true });
    }
  }

  async execute(command: DownloadOrderFileCommmand) {
    try {
      const { url, fileName } = command;
      const filePath = path.resolve(this.folderPath, fileName);

      await downloadFile(url, filePath);

      console.log(
        `\n[${new Date().toLocaleString()}] Downloaded order file:`,
        fileName,
      );
      console.log(filePath);
    } catch (error) {
      if (error instanceof FileDownloadError) {
        console.error('\nFailed to download the order file.');
        return;
      }

      console.error('Something went wrong while downloading the order file.');
    }
  }
}
