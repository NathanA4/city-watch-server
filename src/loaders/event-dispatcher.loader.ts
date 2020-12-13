/*!
 * Copyright 2020 city-watch.ca
 */

import { glob } from 'glob';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { env } from '../env';

export const EventDispatchLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        env.app.dirs.subscribers.map(pattern => glob.sync(pattern).forEach(file => import(file)));
    }
};
