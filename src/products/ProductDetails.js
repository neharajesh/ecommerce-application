import { useParams } from "react-router";
import { data } from "./product-loader";

export const ProductDetails = () => {
    const { productId } = useParams();
    const product = data.find((item) => item.id === productId);
    return <div>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name}/>
        <p>Price : Rs {product.price}</p>
        <p>Rating : {product.ratings}/5</p>
    </div>
}