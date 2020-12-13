/*!
 * Copyright 2020 city-watch.ca
 */

import {EntityRepository, Repository} from 'typeorm';
import {City} from '../models/city';

@EntityRepository(City)
export class CityRepository extends Repository<City> {
}
