import { ClassMongoDB } from '../class/classMongoDB.js';
import { collectionProductsMongoDB } from '../config/config.js';

export const containerProducts = new ClassMongoDB(collectionProductsMongoDB)