import { pool } from '../database/connection.js';

async function updateSchema() {
  try {
    console.log('Updating database schema...');
    
    // Update size column to allow longer values
    await pool.query('ALTER TABLE product_variants ALTER COLUMN size TYPE VARCHAR(50)');
    
    console.log('Schema updated successfully');
  } catch (error) {
    console.error('Error updating schema:', error);
    throw error;
  }
}

updateSchema()
  .then(() => {
    console.log('Schema update completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Schema update failed:', error);
    process.exit(1);
  });
