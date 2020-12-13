/*!
 * Copyright 2020 city-watch.ca
 */

import {Service} from 'typedi';
import {LoggerInterface, LogInjector} from '../../decorators/logger';
import * as xml2js from 'xml2js';

@Service()
export class XmlService {
    private readonly parser: any;

    constructor(
        @LogInjector(__filename, ['XML']) private readonly log: LoggerInterface
    ) {
        this.parser = xml2js.parseString;
    }

    async parseXML(xml) {
        this.log.debug('parsing xml');
        return new Promise((resolve, reject) => {
            this.parser(xml, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}
