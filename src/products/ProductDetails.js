import { useParams } from "react-router";
import { data } from "./product-loader";

export const ProductDetails = () => {
    const { productId } = useParams();
    const product = data.find((item) => item.id === productId);

    const addRatingStars = (rating) => {
        let starString = "";
        for(let i=0; i<rating; i++) {
          starString += "⭐";
        }
        return starString;
      }

    return <div className="product-details-page-container">
        <div className="product-details-container">
            <div>
                <h1>{product.name}</h1>        
                <p>Rating : {addRatingStars(product.ratings)}</p>
                <p>Material : {product.material}</p>
                <p>Brand : {product.brand}</p>
                <p>Offers : {product.offer}</p>
                <p id="product-details-price">Rs. {product.price}</p>
                <div className="product-details-button-container">
                    <button className="button-primary">Add to Cart</button> <br />
                    <button className="button-secondary">Add to Wishlist</button>
                </div>
                <p>{product.inStock ? "IN STOCK" : "OUT OF STOCK"}</p>
                <p>{product.fastDelivery ? "FAST DELIVERY" : "DELIVERY IN 3 DAYS"}</p>
            </div>
            <img src={product.image} alt={product.name}/>
        </div>        
    </div>
}