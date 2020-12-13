/*!
 * Copyright 2020 city-watch.ca
 */

import { recursiveEventNameParser, traverseApply } from './events-helpers';

const eventsObject = {
    test: {
        test: '',
    },
};

recursiveEventNameParser(eventsObject, null)
    .flat(10)
    .forEach(key => traverseApply(eventsObject, key, key));

export const events = eventsObject;
