import dotenv from "dotenv";
import { pool } from "../database/connection.js";

// Load environment variables
dotenv.config();

export async function testDatabaseConnection() {
  try {
    console.log("Testing database connection...");

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    console.log("DATABASE_URL found, attempting connection...");

    // Test the connection
    const result = await pool.query(
      "SELECT NOW() as current_time, version() as postgres_version",
    );

    console.log("✅ Database connection successful!");
    console.log("Current time:", result.rows[0].current_time);
    console.log("PostgreSQL version:", result.rows[0].postgres_version);

    // Test if users table exists
    const tableCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'users'
    `);

    if (tableCheck.rows.length > 0) {
      console.log("✅ Users table exists");

      // Count existing users
      const userCount = await pool.query("SELECT COUNT(*) as count FROM users");
      console.log(`📊 Current users in database: ${userCount.rows[0].count}`);
    } else {
      console.log(
        "⚠️  Users table does not exist - database schema may need to be initialized",
      );
    }

    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  } finally {
    await pool.end();
  }
}

// Run test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testDatabaseConnection()
    .then((success) => {
      if (success) {
        console.log("\n🎉 Database test completed successfully!");
      } else {
        console.log("\n💥 Database test failed!");
      }
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error("Test script failed:", error);
      process.exit(1);
    });
}
