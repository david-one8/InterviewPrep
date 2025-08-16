import dotenv from 'dotenv';
// Load env from .env.local for CLI usage
dotenv.config({ path: '.env.local' });

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
};