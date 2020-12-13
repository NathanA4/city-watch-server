/*!
 * Copyright 2020 city-watch.ca
 */

export interface LoggerInterface {
    debug(...args: Array<any>): void;

    info(...args: Array<any>): void;

    warn(...args: Array<any>): void;

    error(...args: Array<any>): void;
}
