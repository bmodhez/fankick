import fs from "fs/promises";
import path from "path";
import { pool } from "../database/connection.js";

const USERS_JSON_PATH = path.join(process.cwd(), "server/database/users.json");

interface JsonUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  profileImage?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  passwordHash: string;
}

export async function migrateUsersFromJsonToDatabase() {
  try {
    console.log("Starting user migration from JSON to database...");

    // Check if JSON file exists
    try {
      await fs.access(USERS_JSON_PATH);
    } catch (error) {
      console.log("No users.json file found, nothing to migrate.");
      return;
    }

    // Read users from JSON file
    const jsonData = await fs.readFile(USERS_JSON_PATH, "utf-8");
    const users: JsonUser[] = JSON.parse(jsonData);

    if (users.length === 0) {
      console.log("No users found in JSON file.");
      return;
    }

    console.log(`Found ${users.length} users to migrate...`);

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      let migratedCount = 0;
      let skippedCount = 0;

      for (const user of users) {
        try {
          // Check if user already exists in database
          const existingUser = await client.query(
            "SELECT id FROM users WHERE email = $1",
            [user.email.toLowerCase()]
          );

          if (existingUser.rows.length > 0) {
            console.log(`User ${user.email} already exists in database, skipping...`);
            skippedCount++;
            continue;
          }

          // Insert user into database
          const result = await client.query(
            `
            INSERT INTO users (
              email, password_hash, first_name, last_name, phone, 
              date_of_birth, gender, profile_image, is_verified, 
              is_active, created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id
            `,
            [
              user.email.toLowerCase(),
              user.passwordHash,
              user.firstName,
              user.lastName,
              user.phone,
              user.dateOfBirth,
              user.gender,
              user.profileImage,
              user.isVerified,
              user.isActive,
              user.createdAt,
              user.updatedAt,
            ]
          );

          const newUserId = result.rows[0].id;

          // Create default user preferences
          await client.query(
            "INSERT INTO user_preferences (user_id) VALUES ($1)",
            [newUserId]
          );

          console.log(`Migrated user: ${user.email} (ID: ${newUserId})`);
          migratedCount++;
        } catch (userError) {
          console.error(`Error migrating user ${user.email}:`, userError);
          // Continue with next user
        }
      }

      await client.query("COMMIT");

      console.log(`Migration completed!`);
      console.log(`- Migrated: ${migratedCount} users`);
      console.log(`- Skipped: ${skippedCount} users`);

      if (migratedCount > 0) {
        // Backup the JSON file
        const backupPath = USERS_JSON_PATH + ".backup." + Date.now();
        await fs.copyFile(USERS_JSON_PATH, backupPath);
        console.log(`Backup created at: ${backupPath}`);

        // Optional: Remove the original JSON file after successful migration
        // await fs.unlink(USERS_JSON_PATH);
        // console.log("Original users.json file removed.");
      }
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateUsersFromJsonToDatabase()
    .then(() => {
      console.log("Migration script completed successfully.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration script failed:", error);
      process.exit(1);
    });
}
