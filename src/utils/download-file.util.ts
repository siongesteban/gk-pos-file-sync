import fs from 'node:fs';
import https from 'node:https';

export const downloadFile = (url: string, savePath: string) =>
  new Promise<void>((resolve, reject) => {
    https.get(url, (res) => {
      if (res.errored || res.statusCode !== 200) {
        reject(new FileDownloadError());
        return;
      }

      res.on('error', () => {
        reject(new FileWriteError());
      });

      const fileStream = fs.createWriteStream(savePath);

      fileStream.on('error', () => {
        reject(new FileWriteError());
      });

      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    });
  });

export class FileDownloadError extends Error {
  constructor() {
    super('File could not be downloaded.');
  }
}

export class FileWriteError extends Error {
  constructor() {
    super('File could not be saved.');
  }
}
