/*!
 * Copyright 2020 city-watch.ca
 */

import {Service} from 'typedi';
import {LoggerInterface, LogInjector} from '../../decorators/logger';
import axios from 'axios';
import {XmlService} from './xml.service';

@Service()
export class IESOService {
    private static readonly powerGenerationBreakdownURL = `https://www.ieso.ca/-/media/files/ieso/uploaded/chart/generation_fuel_type_multiday.xml?la=en`;
    private static readonly powerDemandURL = `https://www.ieso.ca/-/media/Files/IESO/uploaded/Chart/ontario_demand_multiday.xml?la=en`;

    constructor(
        @LogInjector(__filename, ['IESO']) private readonly log: LoggerInterface,
        private xmlService: XmlService
    ) {
        this.log.debug('Starting IESO service');
    }

    async getPowerGenerationBreakdown() {
        const {data} = await axios.get(IESOService.powerGenerationBreakdownURL);
        const parsed: any = await this.xmlService.parseXML(data);
        let dataSet = parsed.Root.DataSet;
        return {
            biofuel: this.getGenerationByType(dataSet, GenerationTypes.BIOFUEL).pop(),
            gas: this.getGenerationByType(dataSet, GenerationTypes.GAS).pop(),
            hydro: this.getGenerationByType(dataSet, GenerationTypes.HYDRO).pop(),
            nuclear: this.getGenerationByType(dataSet, GenerationTypes.NUCLEAR).pop(),
            solar: this.getGenerationByType(dataSet, GenerationTypes.SOLAR).pop(),
            wind: this.getGenerationByType(dataSet, GenerationTypes.WIND).pop()
        };
    }

    async getPowerData() {
        const {data} = await axios.get(IESOService.powerDemandURL);
        const parsed: any = await this.xmlService.parseXML(data);
        const dataset = this.parseDataset(parsed);
        return {
            currentElectricity: dataset[dataset.length - 1],
        };
    }

    private getGenerationByType(d, type: GenerationTypes): Array<number> {
        return d.filter(el => el.$.Series === GenerationTypes[type])[0].Data
            .filter(el => el.Value !== '')
            .map(el => parseFloat(el.Value))
            .filter(el => !isNaN(el));
    }

    private parseDataset(parsed: any) {
        return parsed.Root.DataSet
            .filter(el => el.$.Series === '5_Minute')
            .map(el => el.Data)[0]
            .filter(el => el.Value !== '')
            .map(el => parseFloat(el.Value))
            .filter(el => !isNaN(el))
            .slice(1).slice(-288)
            .filter((d, i) => (i + 1) % 12 === 0);
    }
}

export enum GenerationTypes {
    'BIOFUEL',
    'GAS',
    'HYDRO',
    'NUCLEAR',
    'SOLAR',
    'WIND'
}
