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

  