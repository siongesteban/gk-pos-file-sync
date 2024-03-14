import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommandBus } from '@nestjs/cqrs';
import { DownloadMenuFileCommmand } from './download-menu-file.command';

@Injectable()
export class DownloadMenuFileSchedule {
  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_SECOND)
  async handle() {
    await this.commandBus.execute(new DownloadMenuFileCommmand());
  }
}
