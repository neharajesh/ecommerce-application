// import { data } from "./product-loader";
// import { data } from "./products-data";
import "../styles.css";
import { useCart } from "../cart/cart-context";
import { useEffect, useReducer, useState } from "react";
import { useWishlist } from "../wishlist/wishlist-context";
import { Link } from "react-router-dom";
import { showNotification } from "../utilities/toast";
import axios from "axios";
// import { addToCartHandler, addToWishlistHandler, addRatingStars } from "../utilities/cart-wishlist-utility";
// import addToCart from "../utilities/cart-utility";

export const Products = () => {

  const { data, setData } = useState([{
    "name": "Spiked Collars",
    "category": "Pet Accessories",
    "price": 8000,
    "rating": 4,
    "image": "https://images.jdmagicbox.com/quickquotes/images_main/b07l11s5sr-fdit-spiked-dog-collar-adjustable-pu-leather-4-rows-studded-pet-collars-dog-pitbull-bulldog-neck-ring-m-black-144117526-xyo3g.jpg",
    "petType": "Dog",
    "description": "Super Spiked collars. Good for social distancing.",
    "brand": "BowBowCollars",
    "inStock": false,
    "fastDelivery": true,
    "hasDiscount": true,
    "discountPercent": 1,
    "deliveryTime": 6
}
]);

  const { setCartCount, setCartPrice, itemsInCart, setItemsInCart } = useCart();

  const { setItemsInWishlist } = useWishlist();

  // const getProductData = async () => {
  //   await axios.get("https://ecommerce-backend.neharajesh.repl.co/products")
  //     .then(response => response.data.forEach(item => setData(data => [...data, item])))
  //     .catch(err => console.log(err.message))
  //   console.log(data)
  //   console.log("data fetched")
  // }

console.log("before useeffect", data)
  useEffect(() => async () => {
    let dataArray = [];

    console.log(data)

    await axios.get("https://ecommerce-backend.neharajesh.repl.co/products")
      .then(response => response.data.forEach(item => dataArray.push(item)))
      .catch(err => console.log(err.message))
    console.log(data)
    setData(data => [...data, dataArray])
    console.log("data fetched")},
 []);

  console.log(data)

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

  const getPriceSortedData = (existingProductList, sortByPrice) => {
    if (sortByPrice && sortByPrice === "PRICE_HIGH_TO_LOW") {
      return existingProductList.sort((a, b) => b["price"] - a["price"]);
    }
    if (sortByPrice && sortByPrice === "PRICE_LOW_TO_HIGH") {
      return existingProductList.sort((a, b) => a["price"] - b["price"]);
    }
    return existingProductList;
  };

  const getRatingSortedData = (existingProductList, sortByRating) => {
    if(sortByRating === null) {
      return existingProductList;
    }
    let ratingNumber = sortByRating;
    const sortedProductList = existingProductList.filter(item => item.ratings === ratingNumber);
    return sortedProductList;
  }

  const getFilteredData = (existingProductList, fastDeliveryOnly, inStockOnly) => {
    const sortedProductList = existingProductList
      .filter((item) => (fastDeliveryOnly ? item.fastDelivery : true))
      .filter((item) => (inStockOnly ? true : item.inStock));
    return sortedProductList;
  };

  console.log(data)
  const priceSortedData = getPriceSortedData(data, sortByPrice);
  console.log(priceSortedData)
  const ratingSortedData = getRatingSortedData(priceSortedData, sortByRating);
  console.log(ratingSortedData)
  const filteredData = getFilteredData(
    ratingSortedData,
    fastDeliveryOnly,
    inStockOnly
  );

  const addToCartHandler = (existingProductList, itemsInCart, productId) => {
    showNotification("Added to Cart");

    let currentProduct = itemsInCart.filter(item => item._id === productId);

    if(currentProduct.length === 0) {
      const itemToAdd = existingProductList.filter(item => item._id === productId);
      setItemsInCart((items) => [...items, itemToAdd]);
    } else {
      itemsInCart = itemsInCart.map(item => {
        if(item._id === productId) {
          item.quantity = item.quantity + 1;
        }
        return item;
      })

    }
    currentProduct = existingProductList.find(item => item._id === productId)    
    const currentProductPrice = parseFloat(currentProduct.price);
    setCartCount((count) => count + 1);
    setCartPrice((price) => price + currentProductPrice);
    setItemsInCart((items) => [...items, currentProduct]);
  };

  const addToWishlistHandler = (productList, productId) => {
    showNotification("Added to Wishlist")
    const currentItem = productList.find((item) => item._id === productId);
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
            _id,
            name,
            image,
            price,
            rating,
            inStock,
            fastDelivery
          }) => (
            <div key={_id} className="product-item">
              <img src={image} alt={name} />
              <div className="product-details">
                <p id="product-details-name">{name}</p>
                <p id="product-details-price">Rs. {price}</p>        
                <p id="product-details-rating">{addRatingStars(rating)}</p>        
                {inStock && <span className="card-badge">In Stock</span>}
                {fastDelivery && <span className="card-badge delivery-badge">fast delivery</span>}
                <div id="product-details-button-container">
                  <button className="button-add button-primary" onClick={() => addToCartHandler(filteredData, itemsInCart, _id)}>
                    Add to Cart
                  </button>
                  <button id="button-wishlist" className="button-add button-secondary" onClick={() => addToWishlistHandler(filteredData, _id)}>
                    Add to Wishlist
                  </button>  
                </div>
                <br/>
                <Link to={`/products/${_id}`}>View Details</Link>          
              </div>              
            </div>
          )
        )}
        <div id="notification-container"></div>
      </div>
    </div>
    </>);
};