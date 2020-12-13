/*!
 * Copyright 2020 city-watch.ca
 */

import * as express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as path from 'path';
import { Logger } from '../util/logger';

// file loader on the server for public files

export const FileLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    const log = new Logger(__filename, ['FILE']);

    if (settings) {
        log.info('Loading Public Dir');
        const expressApp = settings.getData('express_app');
        expressApp.use(express.static(path.join(__dirname, '..', 'public'), {maxAge: 31557600000}));
    }
};
