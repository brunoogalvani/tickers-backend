import { MongoClient } from 'mongodb';

export default async function connectDB(stringConnect) {
  let mongoClient

  try {
    mongoClient = new MongoClient(stringConnect)
    await mongoClient.connect()
    console.log('MongoDB conectado com sucesso!');

    return mongoClient
  } catch (err) {
    console.error('Erro ao conectar com MongoDB:', err);
    process.exit()
  }
}
