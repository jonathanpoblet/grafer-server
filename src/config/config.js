import dotenv from 'dotenv';

dotenv.config({
    path:
        process.env.NODE_ENV = '.env'
})

export const PORT = process.env.PORT || 3000

export const portMongo = process.env.PORT_MONGO;
export const usernameMongo = process.env.USERNAME_MONGO;
export const passwordMongo = process.env.PASSWORD_MONGO;
export const databaseMongo = process.env.DATABASE_MONGO;
export const collectionProductsMongoDB = process.env.COLLECTION_PRODUCTS_MONGO;

export const email = process.env.EMAIL;
export const password = process.env.PASSWORD;

export const clientSecret = process.env.CLIENT_SECRET;
export const clientId = process.env.CLIENT_ID;
