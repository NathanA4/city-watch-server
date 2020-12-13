/*!
 * Copyright 2020 city-watch.ca
 */

import {bootstrapMicroframework} from 'microframework-w3tec';
import 'reflect-metadata';
import {CronLoader} from './loaders/cron.loader';
import {EventDispatchLoader} from './loaders/event-dispatcher.loader';
import {ExpressLoader} from './loaders/express.loader';
import {FileLoader} from './loaders/file.loader';
import {HomeLoader} from './loaders/home.loader';
import {HttpLoader} from './loaders/http.loader';
import {IocLoader} from './loaders/ioc.loader';
import {LoggerLoader} from './loaders/logger.loader';
import {ServerLoader} from './loaders/server.loader';
import {SwaggerLoader} from './loaders/swagger.loader';
import {TypeOrmLoader} from './loaders/type-orm.loader';
import {banner} from './util/banner';
import {Logger} from './util/logger';

export class CompetenceServerApp {
    static log = new Logger(__filename);

    static async main() {
        await bootstrapMicroframework({
            loaders: [
                LoggerLoader,
                HttpLoader,
                IocLoader,
                TypeOrmLoader,
                EventDispatchLoader,
                ExpressLoader,
                SwaggerLoader,
                HomeLoader,
                FileLoader,
                ServerLoader,
                CronLoader,
            ],
        });
        banner(CompetenceServerApp.log);
    }
}

CompetenceServerApp
    .main()
    .catch(err => {
        CompetenceServerApp.log.error('SERVER HAS CRASHED!\n', err);
    });
