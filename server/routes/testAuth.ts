import { Request, Response } from "express";
import { userService } from "../services/userServiceJson.js";

// Test endpoint to create a new user and login
export async function testAuthFlow(req: Request, res: Response) {
  try {
    const testEmail = `testuser${Date.now()}@example.com`;
    const testPassword = "password123";

    console.log("🧪 Testing Auth Flow...");
    console.log("📧 Creating test user:", testEmail);

    // 1. Register a test user
    const newUser = await userService.registerUser({
      email: testEmail,
      password: testPassword,
      firstName: "Test",
      lastName: "User"
    });

    console.log("✅ User created successfully:", newUser.id);

    // 2. Try to login with the same credentials
    const authData = await userService.loginUser({
      email: testEmail,
      password: testPassword
    });

    console.log("✅ Login successful with session token:", authData.sessionToken);

    // 3. Test session verification
    const verifiedUser = await userService.getUserFromSession(authData.sessionToken);

    if (verifiedUser) {
      console.log("✅ Session verification successful:", verifiedUser.email);
      
      res.json({
        success: true,
        message: "Authentication flow test completed successfully",
        data: {
          userCreated: newUser,
          loginSuccessful: true,
          sessionValid: true,
          sessionToken: authData.sessionToken
        }
      });
    } else {
      throw new Error("Session verification failed");
    }

  } catch (error) {
    console.error("❌ Auth flow test failed:", error.message);
    
    res.status(400).json({
      success: false,
      error: error.message || "Authentication test failed"
    });
  }
}
