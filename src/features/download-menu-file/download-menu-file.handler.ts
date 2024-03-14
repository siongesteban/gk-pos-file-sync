import path from 'node:path';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppConfig, AppConfigToken } from '../../app';
import { FileDownloadError, FileWriteError, downloadFile } from '../../utils';
import { DownloadMenuFileCommmand } from './download-menu-file.command';

@CommandHandler(DownloadMenuFileCommmand)
export class DownloadMenuFileHandler
  implements ICommandHandler<DownloadMenuFileCommmand>
{
  constructor(
    @Inject(AppConfigToken)
    private readonly appConfig: AppConfig,
  ) {}

  async execute() {
    try {
      const fileName = this.appConfig.menuFile.name;
      const filePath = path.resolve(this.appConfig.downloadFolder, fileName);

      await downloadFile(this.appConfig.menuFile.downloadUrl, filePath);

      console.log(
        `\n[${new Date().toLocaleString()}] Downloaded menu file:`,
        fileName,
      );
      console.log(filePath);
    } catch (error) {
      if (error instanceof FileWriteError) {
        console.error(
          '\nMenu file could not be saved. Please make sure no other program is opening the file. The download will be retried in the next minute.',
        );
        return;
      }

      if (error instanceof FileDownloadError) {
        console.error('\nFailed to download the menu file.');
        return;
      }

      console.error('Something went wrong while downloading the menu file.');
    }
  }
}
