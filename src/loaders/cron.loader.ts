/*!
 * Copyright 2020 city-watch.ca
 */

import { registerController } from 'cron-decorators';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { env } from '../env';
import { Logger } from '../util/logger';

export const CronLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    const log = new Logger(__filename, ['CRON']);
    if (settings) {
        log.info('Loading Cron jobs...');
        registerController(env.app.dirs.cronJobs);
    }
};
