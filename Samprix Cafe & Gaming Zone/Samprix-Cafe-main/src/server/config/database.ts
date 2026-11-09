import mongoose from 'mongoose';
import dns from 'node:dns';

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  if (!uri || !dbName) {
    throw new Error('MongoDB environment variables are missing');
  }

  const dnsServers = process.env.MONGODB_DNS_SERVERS
  ?.split(',')
  .map(server => server.trim())
  .filter(Boolean);

if (dnsServers?.length) {
  dns.setServers(dnsServers);
  console.log('MongoDB DNS workaround enabled');
}

  await mongoose.connect(uri, {
    dbName,
    serverSelectionTimeoutMS: 15000
  });

  await mongoose.connection.db!.admin().ping();

  console.log('MongoDB connected:', mongoose.connection.name);
}
