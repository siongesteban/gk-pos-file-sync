import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DownloadMenuFileCommmand } from './download-menu-file.command';

@CommandHandler(DownloadMenuFileCommmand)
export class DownloadMenuFileHandler
  implements ICommandHandler<DownloadMenuFileCommmand>
{
  async execute(command: DownloadMenuFileCommmand) {
    console.warn('Not yet implemented', command);
  }
}
