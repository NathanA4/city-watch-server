/*!
 * Copyright 2020 city-watch.ca
 */

// test controller
import {Get, JsonController} from 'routing-controllers';
import {WeatherService} from '../services/weather.service';
import {City} from '../models/city';
import {IESOService} from '../services/ieso.service';
import {CityInfoService} from '../services/city-info.service';

@JsonController('/test')
export class TestController {
    constructor(
        private weatherService: WeatherService,
        private iesoService: IESOService,
        private cityInfoService: CityInfoService,
    ) {
    }

    @Get('')
    async test() {
        const city: City = {
            id: 'abc',
            country: null,
            lat: 43.9,
            lon: -78.85,
            name: 'Oshawa',
            dataPoints: []
        };
        return {
            cityInfo: await this.cityInfoService.getCityInfo(city),
            weather: await this.weatherService.getWeather(city),
            power: await this.iesoService.getPowerData(),
            generation: await this.iesoService.getPowerGenerationBreakdown()
        };
    }
}
