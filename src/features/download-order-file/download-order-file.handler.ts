import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DownloadOrderFileCommmand } from './download-order-file.command';

@CommandHandler(DownloadOrderFileCommmand)
export class DownloadOrderFileHandler
  implements ICommandHandler<DownloadOrderFileCommmand>
{
  async execute(command: DownloadOrderFileCommmand) {
    console.warn('Not yet implemented', command);
  }
}
