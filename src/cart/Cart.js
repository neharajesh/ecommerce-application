import { useCart } from "./cart-context";

export const Cart = () => {
  const {
    cartCount,
    setCartCount,
    cartPrice,
    setCartPrice,
    itemsInCart,
    setItemsInCart
  } = useCart();

  const addToCart = (cartItemsList, productId) => {
    const currentItem = cartItemsList.find((item) => item.id === productId);
    cartItemsList = cartItemsList.map((item) => {
      if (item.id === productId) {
        item = { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    const currentItemPrice = parseFloat(currentItem.price);
    setCartCount((count) => count + 1);
    setCartPrice((price) => price + currentItemPrice);
    setItemsInCart(cartItemsList);
  };

  const removeFromCart = (cartItemsList, productId) => {
    const currentItem = cartItemsList.find((item) => item.id === productId);
    cartItemsList = cartItemsList.map((item) => {
      if (item.id === productId) {
        item.quantity >= 1 ? (item.quantity -= 1) : (item.quantity = 0);
      }
      return item;
    });
    const currentItemPrice = parseFloat(currentItem.price);
    setCartCount((count) => count - 1);
    setCartPrice((price) => price - currentItemPrice);
    setItemsInCart(cartItemsList);
  };

  const updatedItemsList = itemsInCart.filter((item) => item.quantity > 0);

  return (
    <div className="cart-page-container">
      <div className="cart-container">
        {updatedItemsList
          .filter((item) => item.quantity > 0)
          .map((item) => (
            <div className="cart-item"
              key={item.id}
            >
              
              <div className="cart-details-container">
                <img id="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <p id="cart-item-name"> {item.name} </p>
                  <p>Brand : {item.brand}</p>
                  <p>Material : {item.material}</p>
                  <p>Offer : {item.offer}</p>
                </div> 
              </div>
                           
              <div className="cart-button-container">
                <p>Quantity = {item.quantity}</p>
                <button className="button-primary" onClick={() => addToCart(itemsInCart, item.id)}>Add</button>
                <button className="button-secondary" onClick={() => removeFromCart(itemsInCart, item.id)}>
                  Remove
                </button>
              </div>
              <p id="cart-item-price"> {item.price} </p>
            </div>
          ))}
          {itemsInCart.length === 0 && "shop to add stuff to cart!"}
      </div>

      <div className="cart-sidebar">
        <p>Total Items In Cart : <span id="cart-sidebar-highlight">{cartCount}</span></p>
        <p>Total Cart Price = <span id="cart-sidebar-highlight">Rs. {cartPrice}</span></p>
        <button id="checkout-button" className="button-primary">Checkout</button>
      </div>
     
    </div>
  );
};