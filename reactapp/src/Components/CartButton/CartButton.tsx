import React from "react";
// components
import Badge from "@material-ui/core/Badge";
import { IconButton } from "@material-ui/core";
// Styles
import { StyledAddShoppingCartIcon } from "./CartButton.styles";

type Props = {
  totalItems: Number;
  handleClick: () => void;
};

const CartButton: React.FC<Props> = ({ handleClick, totalItems }) => {
  return (
    <IconButton onClick={() => handleClick()} style={{ color: "inherit", background: 'transparent'}}>
      <Badge badgeContent={totalItems} color="error">
        <StyledAddShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartButton;
