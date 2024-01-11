import fs from 'node:fs';
import https from 'node:https';

export const downloadFile = (url: string, savePath: string) =>
  new Promise<void>((resolve, reject) => {
    try {
      https.get(url, (res) => {
        const fileStream = fs.createWriteStream(savePath);
        res.pipe(fileStream);

        if (res.statusCode !== 200) {
          reject(new Error('Could not download file.'));
        }

        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      });
    } catch (error) {
      reject(new Error('Failed to download file.'));
    }
  });
