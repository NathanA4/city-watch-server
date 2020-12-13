import {IsDate, IsInstance, IsNumber, IsUUID, ValidateNested} from 'class-validator';
import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Type} from 'class-transformer';
import {DataNode} from './data-node';

@Entity()
export class HistoricalWeather {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsDate()
    @CreateDateColumn()
    timestamp: Date;

    @IsNumber()
    @Column()
    condition: string;

    @IsNumber()
    @Column()
    conditionDescription: string;

    @IsNumber()
    @Column('float')
    temp: number;

    @IsNumber()
    @Column('float')
    feelsLike: number;

    @IsNumber()
    @Column('float')
    tempMin: number;

    @IsNumber()
    @Column('float')
    tempMax: number;

    @IsNumber()
    @Column('float')
    pressure: number;

    @IsNumber()
    @Column('float')
    humidity: number;

    @IsNumber()
    @Column('float')
    visibility: number;

    @IsNumber()
    @Column('float')
    windSpeed: number;

    @IsNumber()
    @Column('float')
    windDirection: number;

    @Type(type => DataNode)
    @IsInstance(DataNode)
    @ValidateNested()
    @OneToOne(type => DataNode)
    node: DataNode;
}
