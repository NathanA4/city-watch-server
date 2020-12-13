import {IsDate, IsInstance, IsNumber, IsUUID, ValidateNested} from 'class-validator';
import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Type} from 'class-transformer';
import {DataNode} from './data-node';

@Entity()
export class HistoricalPower {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsDate()
    @CreateDateColumn()
    timestamp: Date;

    @IsNumber()
    @Column('float')
    demand: number;

    @IsNumber()
    @Column('float')
    nuclear: number;

    @IsNumber()
    @Column('float')
    solar: number;

    @IsNumber()
    @Column('float')
    wind: number;

    @IsNumber()
    @Column('float')
    biofuel: number;

    @IsNumber()
    @Column('float')
    gas: number;

    @IsNumber()
    @Column('float')
    hydro: number;

    @Type(type => DataNode)
    @IsInstance(DataNode)
    @ValidateNested()
    @OneToOne(type => DataNode)
    node: DataNode;
}
