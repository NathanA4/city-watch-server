/*!
 * Copyright 2020 city-watch.ca
 */

import {
    IsArray,
    IsInstance,
    IsISO31661Alpha2,
    IsISO31661Alpha3,
    IsString,
    IsUUID,
    ValidateNested
} from 'class-validator';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {City} from './city';
import {Type} from 'class-transformer';

@Entity()
export class Country {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @Column()
    name: string;

    @IsISO31661Alpha2()
    @Column()
    a2c: string;

    @IsISO31661Alpha3()
    @Column()
    a3c: string;

    @Type(() => City)
    @IsArray()
    @IsInstance(City)
    @ValidateNested()
    @OneToMany(() => City, city => city.country, {cascade: true})
    cities: Array<City>;
}
