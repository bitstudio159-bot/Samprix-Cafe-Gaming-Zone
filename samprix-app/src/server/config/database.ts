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

  try {
  await mongoose.connect(uri, {
  dbName,
  serverSelectionTimeoutMS: 15000
});
} catch (error: any) {
  console.error('MongoDB connection details:');

  for (const [host, server] of error.reason?.servers ?? []) {
    console.error(host, {
      type: server.type,
      error: server.error?.message,
      code: server.error?.code
    });
  }

  throw error;
}

  await mongoose.connection.db!.admin().ping();

  console.log('MongoDB connected:', mongoose.connection.name);
}
