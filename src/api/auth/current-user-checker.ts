/*!
 * Copyright 2020 city-watch.ca
 */

import {Action} from 'routing-controllers';
import {Connection} from 'typeorm';

export const currentUserChecker: (connection: Connection) => (action: Action) => Promise<any> = (connection: Connection) => {
    return async (action: Action) => {
        const token = action.request.headers.authorization;
        return {token};
    };
};
