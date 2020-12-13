/*!
 * Copyright 2020 city-watch.ca
 */

import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { env } from '../env';
import { Logger } from '../util/logger';

// file loader on the server for public files

export const ServerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    const log = new Logger(__filename, ['SERVER']);

    if (settings) {
        log.info('Loading Server');
        settings.getData('server').listen(env.app.port, () => {
            log.info(`Server Listening on ${env.app.port}`);
        });
    }
};
