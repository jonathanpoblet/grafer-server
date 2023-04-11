import { MongoClient } from 'mongodb';
import { portMongo, usernameMongo, passwordMongo, databaseMongo} from '../config/config.js';

const uri = 'mongodb+srv://adminGraciela:adminFernandez@grafer.klqkvnf.mongodb.net/ecommerce.products'

//`mongodb+srv://adminGraciela:adminFernandez@grafer.klqkvnf.mongodb.net`;

export const mongoClient = new MongoClient(uri)

await mongoClient.connect();

export const mongoDatabase = mongoClient.db(databaseMongo);

 
