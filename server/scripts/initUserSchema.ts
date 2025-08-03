import { pool } from '../database/connection.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initUserSchema() {
  try {
    console.log('Initializing user schema...');
    
    // Read and execute user schema SQL
    const userSchemaSQL = readFileSync(join(__dirname, '../database/userSchema.sql'), 'utf-8');
    
    await pool.query(userSchemaSQL);
    
    console.log('User schema initialized successfully');
    
    // Test the schema
    const result = await pool.query('SELECT COUNT(*) FROM users');
    console.log('Users table verified, current count:', result.rows[0].count);
    
  } catch (error) {
    console.error('Error initializing user schema:', error);
    throw error;
  }
}

initUserSchema()
  .then(() => {
    console.log('User schema initialization completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('User schema initialization failed:', error);
    process.exit(1);
  });
