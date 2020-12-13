import {IsInstance, IsNumber, IsUUID, ValidateNested} from 'class-validator';
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Type} from 'class-transformer';
import {City} from './city';
import {HistoricalWeather} from './historical-weather';
import {HistoricalPower} from './historical-power';

@Entity()
export class DataNode {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNumber()
    @Column()
    population: number;

    @Type(type => HistoricalPower)
    @IsInstance(HistoricalPower)
    @ValidateNested()
    @OneToOne(type => HistoricalPower, {onDelete: 'CASCADE'})
    @JoinColumn()
    power: HistoricalPower;

    @Type(type => HistoricalWeather)
    @IsInstance(HistoricalWeather)
    @ValidateNested()
    @OneToOne(type => HistoricalWeather, {onDelete: 'CASCADE'})
    @JoinColumn()
    weather: HistoricalWeather;

    @IsNumber()
    @Column()
    value: number;

    @Type(type => City)
    @IsInstance(City)
    @ValidateNested()
    @ManyToOne(type => City, {onDelete: 'CASCADE'})
    @JoinColumn()
    city: City;
}
