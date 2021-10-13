import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CartButton from "../../Components/CartButton/CartButton";


export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;
export const StyledCartButton = styled(CartButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;
