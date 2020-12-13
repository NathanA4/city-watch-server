/*!
 * Copyright 2020 city-watch.ca
 */

import {EntityRepository, Repository} from 'typeorm';
import {DataNode} from '../models/data-node';

@EntityRepository(DataNode)
export class DataNodeRepository extends Repository<DataNode> {
}
