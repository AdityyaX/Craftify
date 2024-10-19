import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
  try {
    const mongoURI =
      `${process.env.API_MONGO_LOCATION}://${process.env.API_MONGO_USER}:${process.env.API_MONGO_PASS}` +
      `@${process.env.API_MONGO_URI}/${process.env.API_DB_NAME}?retryWrites=true&w=majority`;

    client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; 
  }
};

export const getDbConnection = (dbName) => {
  if (!client) {
    throw new Error('Database not initialized. Call initializeDbConnection first.');
  }
  return client.db(dbName);
};
