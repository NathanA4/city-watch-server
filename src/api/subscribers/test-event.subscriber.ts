/*!
 * Copyright 2020 city-watch.ca
 */

import {EventSubscriber, On} from 'event-dispatch';
import {Logger} from '../../util/logger';
import {events} from '../events/events';

const log = new Logger(__filename);

@EventSubscriber()
export class TestEventSubscriber {
    @On(events.test.test)
    async test(data: any): Promise<void> {
        log.debug(events.test.test, data);
    }
}
