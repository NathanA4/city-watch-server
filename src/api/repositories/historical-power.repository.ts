/*!
 * Copyright 2020 city-watch.ca
 */

import {EntityRepository, Repository} from 'typeorm';
import {HistoricalPower} from '../models/historical-power';

@EntityRepository(HistoricalPower)
export class HistoricalPowerRepository extends Repository<HistoricalPower> {
}
