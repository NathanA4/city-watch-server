/*!
 * Copyright 2020 city-watch.ca
 */

import {Service} from 'typedi';
import {LoggerInterface, LogInjector} from '../../decorators/logger';
import {City} from '../models/city';
import wiki from 'wikijs';


@Service()
export class CityInfoService {
    constructor(
        @LogInjector(__filename, ['CI']) private readonly log: LoggerInterface
    ) {
    }

    async getCityInfo(city: City) {
        this.log.debug('city data');
        const x = await wiki().page(city.name);
        const summary: string = await x.summary();
        const rawImages: Array<any> = await x.rawImages();
        const fullInfo: any = await x.fullInfo();
        const content: any = await x.content();
        return {
            name: fullInfo.general.name,
            officialName: fullInfo.general.officialName,
            motto: fullInfo.general.motto,
            summary,
            image: rawImages.filter(image => image.title.includes(fullInfo.general.imageSkyline)).map(image => image.imageinfo).pop(),
            content
        };
    }
}
