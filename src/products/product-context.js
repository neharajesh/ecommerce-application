import axios from "axios";

const { createContext, useState, useEffect, useContext } = require("react");

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);

  const loadProductList = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-backend.neharajesh.repl.co/products"
      );
      setProductList(response.data);
    } catch (err) {
      console.log("Error Occurred => ", err.message);
    }
  };

  useEffect(() => {
    loadProductList();
  }, [setProductList]);

  return (
    <>
      <ProductContext.Provider value={{ productList }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
