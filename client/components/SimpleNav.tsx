import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X, LogOut, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function SimpleNav() {
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  
  return (
    <nav style={{ 
      background: 'rgba(0, 0, 0, 0.8)', 
      padding: '1rem', 
      position: 'sticky', 
      top: 0, 
      zIndex: 50,
      borderBottom: '1px solid #333'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Logo */}
        <Link to="/" style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
          ⚡ FANKICK
        </Link>
        
        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/football" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>
            Football
          </Link>
          <Link to="/anime" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>
            Anime
          </Link>
          <Link to="/trending" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>
            Trending
          </Link>
          
          {/* Search Button */}
          <button
            onClick={() => {
              console.log("Search clicked!");
              alert("Search clicked!");
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              padding: '0.5rem',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Search size={20} />
          </button>
          
          {/* User Menu or Login Button */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(to right, #00ff7f, #a855f7)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Crown size={14} style={{ color: 'black' }} />
                </div>
                <span>{user.firstName}</span>
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  minWidth: '200px',
                  zIndex: 60,
                  marginTop: '0.5rem'
                }}>
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '0.5rem' }}>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>{user.firstName} {user.lastName}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{user.email}</div>
                  </div>
                  <Link
                    to="/profile"
                    style={{
                      display: 'block',
                      padding: '0.5rem',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      marginBottom: '0.25rem'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    onClick={() => setShowUserMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    style={{
                      display: 'block',
                      padding: '0.5rem',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      marginBottom: '0.25rem'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Orders
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      style={{
                        display: 'block',
                        padding: '0.5rem',
                        color: '#00ff7f',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        marginBottom: '0.25rem'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      onClick={() => setShowUserMenu(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      textAlign: 'left',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                padding: '0.5rem',
                cursor: 'pointer',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              <User size={20} />
              Login
            </Link>
          )}
          
          {/* Cart Button */}
          <button
            onClick={() => {
              console.log("Cart clicked!");
              setShowCart(!showCart);
              alert("Cart clicked!");
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              padding: '0.5rem',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <ShoppingCart size={20} />
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: '#00ff7f',
              color: 'black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              2
            </span>
          </button>
        </div>
      </div>
      
      {/* Debug info */}
      {showAuth && (
        <div style={{ 
          position: 'absolute', 
          top: '100%', 
          right: '2rem', 
          background: 'black', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '4px',
          zIndex: 60
        }}>
          Auth Modal would open here
        </div>
      )}
      
      {showCart && (
        <div style={{ 
          position: 'absolute', 
          top: '100%', 
          right: '2rem', 
          background: 'black', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '4px',
          zIndex: 60,
          width: '300px'
        }}>
          Cart sidebar would open here
        </div>
      )}
    </nav>
  );
}
