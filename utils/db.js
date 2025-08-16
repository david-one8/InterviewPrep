import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Use public env var because this module is imported in client components
const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
if (!databaseUrl) {
  throw new Error('NEXT_PUBLIC_DATABASE_URL is not set');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });