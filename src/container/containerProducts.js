import { ClassMongoDB } from '../class/ClassMongoDB.js';
import { collectionProductsMongoDB } from '../config/config.js';

export const containerProducts = new ClassMongoDB(collectionProductsMongoDB)