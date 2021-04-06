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
    <>
      <h1>Cart</h1>
      <h3>{cartCount} items currently in cart!</h3>
      <h3>Total Cart Price = Rs. {cartPrice}</h3>
      {updatedItemsList
        .filter((item) => item.quantity > 0)
        .map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid black",
              margin: "1rem",
              padding: "1rem"
            }}
          >
            <h2> {item.name} </h2>
            <p> Price = Rs. {item.price} </p>
            <p>Quantity = {item.quantity}</p>
            <button onClick={() => addToCart(itemsInCart, item.id)}>Add</button>
            <button onClick={() => removeFromCart(itemsInCart, item.id)}>
              Remove
            </button>
          </div>
        ))}
    </>
  );
};