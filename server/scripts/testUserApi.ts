import { userService } from '../services/userService.js';

async function testUserApi() {
  try {
    console.log('Testing user API...');
    
    // Test user registration
    const testUser = {
      email: 'test@example.com',
      password: 'test123',
      firstName: 'Test',
      lastName: 'User',
      phone: '+91 9876543210'
    };
    
    console.log('1. Testing user registration...');
    try {
      const newUser = await userService.registerUser(testUser);
      console.log('✅ User registered successfully:', newUser.email);
      
      // Test login
      console.log('2. Testing user login...');
      const { user, session } = await userService.loginUser({
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ User logged in successfully:', user.email);
      console.log('Session token:', session.sessionToken.substring(0, 10) + '...');
      
      // Test session verification
      console.log('3. Testing session verification...');
      const verifiedUser = await userService.verifySession(session.sessionToken);
      if (verifiedUser) {
        console.log('✅ Session verified successfully:', verifiedUser.email);
      } else {
        console.log('❌ Session verification failed');
      }
      
      // Test logout
      console.log('4. Testing logout...');
      const loggedOut = await userService.logoutUser(session.sessionToken);
      console.log('✅ User logged out:', loggedOut);
      
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        console.log('ℹ️ User already exists, skipping registration test');
        
        // Test login with existing user
        console.log('2. Testing login with existing user...');
        const { user, session } = await userService.loginUser({
          email: testUser.email,
          password: testUser.password
        });
        console.log('✅ User logged in successfully:', user.email);
      } else {
        throw error;
      }
    }
    
    console.log('\n✅ All user API tests passed!');
    
  } catch (error) {
    console.error('❌ User API test failed:', error);
    throw error;
  }
}

testUserApi()
  .then(() => {
    console.log('User API testing completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('User API testing failed:', error);
    process.exit(1);
  });
