import { useState, useCallback } from "react";
import { useQuery } from "react-query";
// Components
import NavBar from "../../Components/Navbar/NavBar";
import Item from "../../Components/Item/Item";
import Cart from "../../Components/Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
// import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
// Styles
import { Wrapper } from "./Home.styles";

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const Home: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data)

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // Is the item already added in the cart ?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = useCallback((id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  }, [])

  const handleRemoveAllFromCart = useCallback(() => setCartItems([] as CartItemType[]), [])

  let itemsList;
  if (isLoading) {
    itemsList = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    itemsList = data?.map((item) => (
      <Grid item key={item.id} xs={12} sm={6} md={4}>
        <Item item={item} handleAddToCart={handleAddToCart} />
      </Grid>
    ));
  }

  if (error) return <div>Something went wrong ...</div>;

  return (
      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            removeAllFromCart={handleRemoveAllFromCart}
          />
        </Drawer>
        <NavBar
          totalItems={getTotalItems(cartItems)}
          handleClick={() => setCartOpen(true)}
        />
        <Grid container spacing={3}>
          {/* {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))} */}
          {itemsList}
        </Grid>
      </Wrapper>
  );
};

export default Home;
