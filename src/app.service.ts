import { Injectable, Inject } from '@nestjs/common';
import { AppConfigToken, AppConfig } from './app.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(AppConfigToken)
    private readonly appConfig: AppConfig,
  ) {}

  getHello() {
    return {
      config: this.appConfig,
    };
  }
}
