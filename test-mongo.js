// test-mongo.js
const { MongoClient } = require('mongodb');

const uri = process.env.COSMOSDB_URI || 'mongodb://dmoravargas:YOUR_PASSWORD@anabelendb.mongocluster.cosmos.azure.com:10255/?tls=true&authMechanism=SCRAM-SHA-256';
const dbName = process.env.COSMOSDB_DBNAME || 'beePlatform';

async function testConnection() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log('Connected! Collections:', collections.map(c => c.name));
    await client.close();
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

testConnection();
