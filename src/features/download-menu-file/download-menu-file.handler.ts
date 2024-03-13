import path from 'node:path';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppConfig, AppConfigToken } from '../../app';
import { downloadFile } from '../../utils';
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

      console.log('\nDownloaded menu file:', fileName);
      console.log(filePath);
    } catch (error) {
      if (error.code === 'EBUSY') {
        console.log(
          '\nMenu file could not be downloaded. Please make sure no other program is opening the file.',
        );
        return;
      }

      throw error;
    }
  }
}
