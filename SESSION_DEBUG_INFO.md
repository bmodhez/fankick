# Session Management Debug Info

## Issue: Session Verification Failed

The "Invalid or expired session" error occurs because:

### Root Cause

- **In-Memory Sessions**: Sessions are stored in a JavaScript `Map` in memory
- **Server Restarts**: Every dev server restart clears all sessions
- **Development Workflow**: Hot reload and file changes restart the server frequently

### What Happens

1. User logs in successfully → Session stored in memory + localStorage
2. Developer makes code changes → Vite restarts server
3. Memory sessions are cleared → localStorage session becomes invalid
4. Next page load → Session verification fails with 401 error

### Current Fixes Applied

✅ **Improved Error Handling**: Session failures are now handled gracefully
✅ **Better Logging**: Debug info shows when sessions fail due to server restart
✅ **User-Friendly Messages**: No scary error messages for normal session expiry
✅ **Auto-Cleanup**: Invalid sessions are automatically cleared from localStorage

### For Users

- **Expected Behavior**: Session verification errors after server restarts are normal
- **Solution**: Simply login again using the demo login button
- **No Data Loss**: All other features work normally

### For Production

In production, sessions would typically be:

- Stored in Redis/Database for persistence
- Use JWT tokens for stateless authentication
- Have longer expiry times
- Not affected by server restarts

### Demo Login

Use the demo credentials for easy testing:

- Email: `test@example.com`
- Password: `password123`
- Or click "🚀 Try Demo Login" button
