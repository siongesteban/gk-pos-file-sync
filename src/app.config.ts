import { ConfigType, registerAs } from '@nestjs/config';
import env from './env.json';

export type AppConfig = ConfigType<typeof appConfig>;
export const appConfig = registerAs('app', () => ({
  ...env,
  sqsNames: {
    downloadMenu: 'download-menu',
  },
}));
export const AppConfigToken = appConfig.KEY;
