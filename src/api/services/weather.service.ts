/*!
 * Copyright 2020 city-watch.ca
 */

import {Service} from 'typedi';
import {LoggerInterface, LogInjector} from '../../decorators/logger';
import {env} from '../../env';
import axios from 'axios';
import {City} from '../models/city';

@Service()
export class WeatherService {
    constructor(
        @LogInjector(__filename, ['weather']) private readonly log: LoggerInterface
    ) {
        this.log.debug('Starting weather service', env.openWeather.key);
    }

    async getWeather(city: City) {
        const {data} = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${env.openWeather.key}`
        );
        return data;
    }
}
