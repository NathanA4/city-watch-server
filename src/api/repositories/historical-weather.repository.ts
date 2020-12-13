/*!
 * Copyright 2020 city-watch.ca
 */

import {EntityRepository, Repository} from 'typeorm';
import {HistoricalWeather} from '../models/historical-weather';

@EntityRepository(HistoricalWeather)
export class HistoricalWeatherRepository extends Repository<HistoricalWeather> {
}
