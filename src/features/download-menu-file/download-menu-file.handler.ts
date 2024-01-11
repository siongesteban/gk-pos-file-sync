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

  async execute(command: DownloadMenuFileCommmand) {
    const { url, fileName } = command;
    const filePath = path.resolve(this.appConfig.downloadFolder, fileName);

    await downloadFile(url, filePath);

    console.log('\nDownloaded menu file:', fileName);
    console.log(filePath);
  }
}
