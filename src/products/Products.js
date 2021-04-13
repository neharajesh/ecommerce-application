import { data } from "./product-loader";
import "../styles.css";
import { useCart } from "../cart/cart-context";
import { useReducer } from "react";
import { useWishlist } from "../wishlist/wishlist-context";
import { Link } from "react-router-dom";
import { showNotification } from "../utilities/toast";

export const Products = () => {
  const { setCartCount, setCartPrice, setItemsInCart } = useCart();

  const { setItemsInWishlist } = useWishlist();

  const initialData = {
    inStockOnly: true,
    fastDeliveryOnly: false,
    sortByPrice: null,
    sortByRating: null
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
      case "SORT_BY_RATING":
        return (state = {
          ...state,
          sortByRating: action.payload
        });
      case "INITIAL_DATA" :
        return initialData;
      default:
        return state;
    }
  };

  const [{ inStockOnly, fastDeliveryOnly, sortByPrice, sortByRating }, dispatch] = useReducer(
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

  const getRatingSortedData = (productList, sortByRating) => {
    if(sortByRating === null) {
      return productList;
    }
    let ratingNumber = sortByRating;
    const sortedProductList = productList.filter(item => item.ratings === ratingNumber);
    return sortedProductList;
  }

  const getFilteredData = (productList, fastDeliveryOnly, inStockOnly) => {
    const sortedProductList = productList
      .filter((item) => (fastDeliveryOnly ? item.fastDelivery : true))
      .filter((item) => (inStockOnly ? true : item.inStock));
    return sortedProductList;
  };

  const priceSortedData = getPriceSortedData(data, sortByPrice);
  const ratingSortedData = getRatingSortedData(priceSortedData, sortByRating);
  const filteredData = getFilteredData(
    ratingSortedData,
    fastDeliveryOnly,
    inStockOnly
  );

  const addToCartHandler = (existingProductList, productId) => {
    showNotification("Added to Cart");
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
    showNotification("Added to Wishlist")
    const currentItem = productList.find((item) => item.id === productId);
    setItemsInWishlist((items) => [...items, currentItem]);
  };

  const addRatingStars = (rating) => {
    let starString = "";
    for(let i=0; i<rating; i++) {
      starString += "⭐";
    }
    return starString;
  }
  
  return (<>
    <p style={{marginLeft: '1rem'}}>Total no. of products : {filteredData.length}</p>
    <div className="product-page-container">
      <div className="container-sort">
        <fieldset>
          <legend>Sort By :</legend>
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
        </fieldset>

        <fieldset>
          <legend>Price :</legend>
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
        </fieldset>

        <fieldset>
          <legend>Rating :</legend>
          <label><input type="radio" onChange={() => dispatch({ type: "SORT_BY_RATING", payload: 1})} 
                  checked={sortByRating && sortByRating === 1} />⭐</label> <br />
          <label><input type="radio" onChange={() => dispatch({ type: "SORT_BY_RATING", payload: 2})} 
                  checked={sortByRating && sortByRating === 2} />⭐⭐</label> <br />
          <label><input type="radio" onChange={() => dispatch({ type: "SORT_BY_RATING", payload: 3})} 
                  checked={sortByRating && sortByRating === 3} />⭐⭐⭐</label> <br />
          <label><input type="radio" onChange={() => dispatch({ type: "SORT_BY_RATING", payload: 4})} 
                  checked={sortByRating && sortByRating === 4} />⭐⭐⭐⭐</label> <br />
          <label><input type="radio" onChange={() => dispatch({ type: "SORT_BY_RATING", payload: 5})} 
                  checked={sortByRating && sortByRating === 5} />⭐⭐⭐⭐⭐</label> <br />
        </fieldset>    

        <button id="filter-reset-button" className="button-primary" onClick={() => dispatch({type: "INITIAL_DATA"})}>Reset Filters</button> 
      </div>      
      
      <div className="product-container">        
        {filteredData.map(
          ({
            id,
            name,
            image,
            price,
            ratings,
            inStock,
            fastDelivery
          }) => (
            <div key={id} className="product-item">
              <img src={image} alt={name} />
              <div className="product-details">
                <p id="product-details-name">{name}</p>
                <p id="product-details-price">Rs. {price}</p>        
                <p id="product-details-rating">{addRatingStars(ratings)}</p>        
                {inStock && <span className="card-badge">In Stock</span>}
                {fastDelivery && <span className="card-badge delivery-badge">fast delivery</span>}
                <div id="product-details-button-container">
                  <button className="button-add button-primary" onClick={() => addToCartHandler(filteredData, id)}>
                    Add to Cart
                  </button>
                  <button id="button-wishlist" className="button-add button-secondary" onClick={() => addToWishlistHandler(filteredData, id)}>
                    Add to Wishlist
                  </button>  
                </div>
                <br/>
                <Link to={`/products/${id}`}>View Details</Link>          
              </div>              
            </div>
          )
        )}
        <div id="notification-container"></div>
      </div>
    </div>
    </>);
};