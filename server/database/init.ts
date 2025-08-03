import { pool } from "./connection.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function initializeDatabase() {
  try {
    console.log("Initializing database schema...");

    // Read and execute product schema SQL
    const schemaSQL = readFileSync(join(__dirname, "schema.sql"), "utf-8");
    await pool.query(schemaSQL);

    // Read and execute user schema SQL
    const userSchemaSQL = readFileSync(join(__dirname, "userSchema.sql"), "utf-8");
    await pool.query(userSchemaSQL);

    console.log("Database schema initialized successfully");

    // Test the connection
    const result = await pool.query("SELECT NOW()");
    console.log("Database connection test successful:", result.rows[0]);

    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Auto-initialize when this module is imported, but don't block on errors
initializeDatabase().catch((error) => {
  console.error("Database initialization failed:", error);
  console.log("Server will continue without database initialization");
});
