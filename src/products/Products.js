import { data } from "./product-loader";
import "../styles.css";
import { useCart } from "../cart/cart-context";
import { useReducer } from "react";
import { useWishlist } from "../wishlist/wishlist-context";

export const Products = () => {
  const { setCartCount, setCartPrice, setItemsInCart } = useCart();

  const { setItemsInWishlist } = useWishlist();

  const initialData = {
    inStockOnly: true,
    fastDeliveryOnly: false,
    sortByPrice: null
  };

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "TOGGLE_STOCK":
        return (state = {
          ...state,
          inStockOnly: !state.inStockOnly
        });
      case "TOGGLE_DELIVERY":
        return (state = {
          ...state,
          fastDeliveryOnly: !state.fastDeliveryOnly
        });
      case "SORT_BY_PRICE":
        return (state = {
          ...state,
          sortByPrice: action.payload
          //this action.payload thing takes value from the radio button.
        });
      default:
        return state;
    }
  };

  const [{ inStockOnly, fastDeliveryOnly, sortByPrice }, dispatch] = useReducer(
    reducerFunction,
    initialData
  );

  const getPriceSortedData = (productList, sortByPrice) => {
    if (sortByPrice && sortByPrice === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }
    if (sortByPrice && sortByPrice === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  };

  const getFilteredData = (productList, fastDeliveryOnly, inStockOnly) => {
    const sortedProductList = productList
      .filter((item) => (fastDeliveryOnly ? item.fastDelivery : true))
      .filter((item) => (inStockOnly ? true : item.inStock));
    return sortedProductList;
  };

  const priceSortedData = getPriceSortedData(data, sortByPrice);
  const filteredData = getFilteredData(
    priceSortedData,
    fastDeliveryOnly,
    inStockOnly
  );

  const addToCartHandler = (existingProductList, productId) => {
    let currentProduct = existingProductList.find(
      (item) => item.id === productId
    );
    currentProduct = { ...currentProduct, quantity: 1 };
    const currentProductPrice = parseFloat(currentProduct.price);
    setCartCount((count) => count + 1);
    setCartPrice((price) => price + currentProductPrice);
    setItemsInCart((items) => [...items, currentProduct]);
  };

  const addToWishlistHandler = (productList, productId) => {
    const currentItem = productList.find((item) => item.id === productId);
    setItemsInWishlist((items) => [...items, currentItem]);
  };

  return (
    <>
      <h1>Products</h1>
      <div className="container-sort">
        <strong> Sort By: </strong>
        <br />
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => dispatch({ type: "TOGGLE_STOCK" })}
          />
          Show Out of Stock
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={fastDeliveryOnly}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          Show Fast Delivery Only
        </label>
      </div>

      <br />

      <div class="container-sort">
        <strong>Price :</strong>
        <br />
        <label>
          <input
            type="radio"
            onChange={() =>
              dispatch({
                type: "SORT_BY_PRICE",
                payload: "PRICE_LOW_TO_HIGH"
              })
            }
            checked={sortByPrice && sortByPrice === "PRICE_LOW_TO_HIGH"}
          />
          Low to High
        </label>
        <br />
        <label>
          <input
            type="radio"
            onChange={() =>
              dispatch({
                type: "SORT_BY_PRICE",
                payload: "PRICE_HIGH_TO_LOW"
              })
            }
            checked={sortByPrice && sortByPrice === "PRICE_HIGH_TO_LOW"}
          />
          High To Low
        </label>
      </div>

      <div className="product-container">
        {filteredData.map(
          ({
            id,
            name,
            image,
            productName,
            price,
            inStock,
            fastDelivery,
            quantity
          }) => (
            <div key={id} className="product-item">
              <img src={image} alt={name} />
              <div className="product-details">
                <h2>{name}</h2>
                <p>{productName}</p>
                <p>{price}</p>
                <p>{inStock ? "in stock!" : "out of stock"}</p>
                <p>{fastDelivery ? "delivery is fast" : "minimum 3 days"}</p>
                <button onClick={() => addToCartHandler(filteredData, id)}>
                  Add to Cart
                </button>
                <button onClick={() => addToWishlistHandler(filteredData, id)}>
                  Add to Wishlist
                </button>
              </div>              
            </div>
          )
        )}
      </div>
    </>
  );
};