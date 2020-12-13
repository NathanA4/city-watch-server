import {IsArray, IsInstance, IsLatitude, IsLongitude, IsString, IsUUID, ValidateNested} from 'class-validator';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Country} from './country';
import {Type} from 'class-transformer';
import {DataNode} from './data-node';

@Entity()
export class City {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @Column()
    name: string;

    @Type(type => Country)
    @IsInstance(Country)
    @ValidateNested()
    @ManyToOne(type => Country, {onDelete: 'CASCADE'})
    @JoinColumn()
    country: Country;

    @IsLatitude()
    @Column('float')
    lat: number;

    @IsLongitude()
    @Column('float')
    lon: number;

    @Type(() => DataNode)
    @IsArray()
    @IsInstance(DataNode)
    @ValidateNested()
    @OneToMany(() => DataNode, dataNode => dataNode.city, {cascade: true})
    dataPoints: Array<DataNode>;
}
