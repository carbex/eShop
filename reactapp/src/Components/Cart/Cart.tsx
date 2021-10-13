import { useState } from 'react'
// Components
import StripeContainer from '../Stripe/StripeContainer';
import CartItem from "../CartItem/CartItem";
import Button from "@material-ui/core/Button";
import { Modal, Box } from '@material-ui/core';
// Styles
import { Wrapper } from "./Cart.styles";
// Types
import { CartItemType } from "../../Pages/Home/Home";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '100%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  // p: 4,
};

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  removeAllFromCart: () => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, removeAllFromCart }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: {calculateTotal(cartItems).toFixed(2)}€</h2>
      {+calculateTotal(cartItems) !== 0 &&
      <Button
      style={{width: '100%'}}
      size="medium"
      variant="contained"
      onClick={handleOpen}
      >
        Checkout
      </Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StripeContainer amount={+calculateTotal(cartItems).toFixed(2) * 100} removeAllFromCart={removeAllFromCart}/>
        </Box>
        
      </Modal>
    </Wrapper>
  );
};

export default Cart;
