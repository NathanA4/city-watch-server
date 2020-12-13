/*!
 * Copyright 2020 city-watch.ca
 */

import {Cron, CronController} from 'cron-decorators';
import {Logger} from '../../util/logger';

const log = new Logger(__filename);

@CronController('test')
export class TestCronJob {
  @Cron('test', '*/1 * * * *')
  async removeUnverifiedUsers() {
    log.debug('TEST');
  }
}
