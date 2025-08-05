import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";

export function SimpleNav() {
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  
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
          
          {/* Login Button */}
          <button
            onClick={() => {
              console.log("Login clicked!");
              setShowAuth(!showAuth);
              alert("Login clicked!");
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
              gap: '0.5rem'
            }}
          >
            <User size={20} />
            Login
          </button>
          
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
