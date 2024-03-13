import {
  DownloadMenuFileHandler,
  DownloadMenuFileSchedule,
} from './download-menu-file';
import {
  DownloadOrderFileHandler,
  DownloadOrderFileSqsHandler,
} from './download-order-file';

export const features = [DownloadMenuFileHandler, DownloadOrderFileHandler];

export const sqsHandlers = [DownloadOrderFileSqsHandler];

export const schedules = [DownloadMenuFileSchedule];
