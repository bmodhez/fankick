import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";

export function DebugCart() {
  const { items, addToCart, removeFromCart, totalItems, totalPrice } = useCart();
  const { products } = useProducts();

  const testAddToCart = () => {
    if (products.length > 0 && products[0].variants.length > 0) {
      addToCart(products[0], products[0].variants[0]);
      console.log("Added to cart:", products[0].name);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'black',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      zIndex: 1000,
      border: '2px solid #00ff7f'
    }}>
      <h3>🛒 Cart Debug</h3>
      <p>Items: {totalItems}</p>
      <p>Total: ₹{totalPrice}</p>
      
      <button
        onClick={testAddToCart}
        style={{
          background: '#00ff7f',
          color: 'black',
          border: 'none',
          padding: '0.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '0.5rem 0'
        }}
      >
        Add Test Item
      </button>
      
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {items.map((item, index) => (
          <div key={index} style={{ 
            background: '#333', 
            padding: '0.5rem', 
            margin: '0.25rem 0', 
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <div>{item.product.name}</div>
            <div>Qty: {item.quantity}</div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                background: 'red',
                color: 'white',
                border: 'none',
                padding: '0.25rem',
                borderRadius: '2px',
                cursor: 'pointer',
                fontSize: '10px'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
