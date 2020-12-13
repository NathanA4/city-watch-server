/*!
 * Copyright 2020 city-watch.ca
 */

import { defaultMetadataStorage } from 'class-transformer/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';
import { env } from '../env';
import { Logger } from '../util/logger';

// load swagger with the reflected metadata for cool swagger pages

export const SwaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    const log = new Logger(__filename, ['SWAGGER']);

    if (settings && env.swagger.enabled) {
        log.info('Loading Swagger');
        const expressApp = settings.getData('express_app');
        const schemas = validationMetadatasToSchemas(
            // (getFromContainer(MetadataStorage) as any).validationMetadatas,
            {classTransformerMetadataStorage: defaultMetadataStorage},
        );
        const swaggerFile = routingControllersToSpec(
            getMetadataArgsStorage(),
            {},
            {
                components: {
                    schemas,
                },

            },
        );
        swaggerFile.info = {
            title: env.app.name,
            name: env.app.name,
            description: env.app.description,
            version: env.app.version,
        };
        swaggerFile.servers = [
            {
                url: `${env.app.schema}://${env.app.host}${(env.app.publicPort === 80 ? '' : `:${env.app.publicPort}`)}/${env.app.routePrefix}`,
            },
        ];
        expressApp.use(
            `/${env.swagger.route}`,
            (req, res, next) => next(),
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile),
        );
    }
};
