import {
  DownloadMenuFileHandler,
  DownloadMenuFileSqsHandler,
} from './download-menu-file';
import {
  DownloadOrderFileHandler,
  DownloadOrderFileSqsHandler,
} from './download-order-file';

export const features = [DownloadMenuFileHandler, DownloadOrderFileHandler];

export const sqsHandlers = [
  DownloadMenuFileSqsHandler,
  DownloadOrderFileSqsHandler,
];
