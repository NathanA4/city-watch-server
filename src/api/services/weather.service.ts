/*!
 * Copyright 2020 city-watch.ca
 */

import {Service} from 'typedi';
import {LoggerInterface, LogInjector} from '../../decorators/logger';
import {env} from '../../env';
import axios from 'axios';
import {City} from '../models/city';
import {HistoricalWeather} from '../models/historical-weather';

@Service()
export class WeatherService {

    constructor(
        @LogInjector(__filename, ['weather']) private readonly log: LoggerInterface
    ) {
        this.log.debug('Starting weather service', env.openWeather.key);
    }

    private static readonly weatherUrlTemplate = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.openWeather.key}`;

    async getWeather(city: City): Promise<Partial<HistoricalWeather>> {
        const {data} = await axios.get(
            WeatherService.weatherUrlTemplate(city.lat, city.lon)
        );
        return {
            temp: WeatherService.kelvinToCelsius(data.main.temp),
            tempMin: WeatherService.kelvinToCelsius(data.main.temp_min),
            tempMax: WeatherService.kelvinToCelsius(data.main.temp_max),
            feelsLike: WeatherService.kelvinToCelsius(data.main.feels_like),
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            visibility: data.visibility,
            windSpeed: data.wind.speed,
            windDirection: data.wind.deg,
            condition: data.weather[0].main,
            conditionDescription: data.weather[0].description,
        };
    }

    private static kelvinToCelsius(k: number) {
        return parseFloat((k - 273.15).toPrecision(2));
    }
}
