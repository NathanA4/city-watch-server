/*!
 * Copyright 2020 city-watch.ca
 */

import {Service} from 'typedi';
import {EventDispatcher, EventDispatcherInterface} from '../../decorators/event-dispatcher';
import {LoggerInterface, LogInjector} from '../../decorators/logger';
import {events} from '../events/events';

@Service()
export class TestService {
    constructor(
        @LogInjector(__filename) private readonly log: LoggerInterface,
        @EventDispatcher() private readonly eventDispatcher: EventDispatcherInterface,
    ) {
    }

    async test() {
        this.log.debug('TEST');
        this.eventDispatcher.dispatch(events.test.test);
        return {};
    }
}
