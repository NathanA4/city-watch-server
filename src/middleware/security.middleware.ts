/*!
 * Copyright 2020 city-watch.ca
 */

import * as express from 'express';
import helmet from 'helmet';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

// adding helmet for some basic securities

@Middleware({type: 'before'})
export class SecurityMiddleware implements ExpressMiddlewareInterface {
    use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return helmet()(req, res, next);
    }
}
