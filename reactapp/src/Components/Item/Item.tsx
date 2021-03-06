import Button from "@material-ui/core/Button";
// Types
import { CartItemType } from "../../Pages/Home/Home";
// Styles
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>{item.price.toFixed(2)}€</h3>
    </div>
    <Button 
      size="medium"
      disableElevation
      variant="contained" 
      onClick={() => handleAddToCart(item)}
    >
      Add to cart
    </Button>
  </Wrapper>
);

export default Item;
