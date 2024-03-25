import fsPromises from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import { Inject, OnModuleInit } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppConfig, AppConfigToken } from '../../app';
import { FileDownloadError, downloadFile, log } from '../../utils';
import { DownloadOrderFileCommmand } from './download-order-file.command';

@CommandHandler(DownloadOrderFileCommmand)
export class DownloadOrderFileHandler
  implements ICommandHandler<DownloadOrderFileCommmand>, OnModuleInit
{
  private readonly folderPath: string;
  private readonly archivePath: string;

  constructor(
    @Inject(AppConfigToken)
    private readonly appConfig: AppConfig,
  ) {
    this.folderPath = path.resolve(this.appConfig.downloadFolder, 'orders');
    this.archivePath = path.resolve(this.appConfig.downloadFolder, 'archive');
  }

  async onModuleInit() {
    // Pre-create download path for the file.
    await Promise.all([
      fsPromises.mkdir(this.folderPath, { recursive: true }),
      fsPromises.mkdir(this.archivePath, { recursive: true })
  ]);
  }

  async execute(command: DownloadOrderFileCommmand) {
    try {
      const { url, fileName } = command;
      const filePath = path.resolve(this.folderPath, fileName);
      const archivePath = path.resolve(this.archivePath, fileName);
      
      await Promise.all([
        downloadFile(url, filePath),
        downloadFile(url, archivePath)
    ]);

      log('Downloaded order file:', fileName, `\n${filePath}`);
    } catch (error) {
      if (error instanceof FileDownloadError) {
        log('Failed to download the order file.');
        return;
      }

      log('Something went wrong while downloading the order file.', error);
    }
  }
}
