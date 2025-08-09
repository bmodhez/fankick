// Test utility to verify authentication-aware like functionality
// This can be run in the browser console to test the system

export const testLikeSystem = () => {
  console.log("🧪 Testing Enhanced Like System");
  
  // Check if contexts are available
  const authContext = (window as any).authContext;
  const likeContext = (window as any).likeContext;
  
  if (!authContext || !likeContext) {
    console.error("❌ Contexts not available. Make sure the app is running.");
    return;
  }
  
  console.log("✅ Contexts available");
  console.log("🔐 Auth state:", authContext.isAuthenticated ? "Logged in" : "Not logged in");
  console.log("❤️ Liked products count:", likeContext.likeCount);
  console.log("📝 Liked products:", [...likeContext.likedProducts]);
  
  if (!authContext.isAuthenticated) {
    console.log("🚨 Please log in to test like functionality");
    return;
  }
  
  console.log("✅ All systems ready for testing");
  console.log("💡 Try liking/unliking products and check if counts update everywhere");
};

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testLikeSystem = testLikeSystem;
}
