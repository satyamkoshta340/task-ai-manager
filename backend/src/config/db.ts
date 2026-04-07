import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString?.startsWith('postgres') && !connectionString?.startsWith('postgresql')) {
  console.warn('WARNING: DATABASE_URL must start with postgres:// or postgresql:// to use the pg adapter directly.');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
