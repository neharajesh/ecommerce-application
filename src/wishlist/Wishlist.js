import { useWishlist } from "./wishlist-context";

export const Wishlist = () => {
  const { itemsInWishlist, setItemsInWishlist } = useWishlist();

  const removeFromWishlist = (currentList, itemId) => {
    const currentItem = currentList.find((item) => item.id === itemId);
    const updatedList = itemsInWishlist.filter(
      (item) => item.id !== currentItem.id
    );
    setItemsInWishlist(updatedList);
  };

  return (
    <>
      <h1>Wishlist</h1>
      {itemsInWishlist.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid black",
            margin: "1rem",
            padding: "1rem"
          }}
        >
          {item.name} <br />
          {item.price} <br />
          <button onClick={() => removeFromWishlist(itemsInWishlist, item.id)}>
            Remove
          </button>
        </div>
      ))}
      {itemsInWishlist.length === 0 && "wishlist is empty"}
    </>
  );
};