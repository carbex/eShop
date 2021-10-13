import React from "react";
// Components
import CartButton from "../CartButton/CartButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// Styles
import {
  Wrapper,
  StyledTypography,
  NavLink,
  StyledLink,
} from "./NavBar.styles";

type Props = {
  totalItems: Number;
  handleClick: () => void;
};

const NavBar: React.FC<Props> = ({ totalItems, handleClick }) => {
  return (
    <Wrapper>
      <AppBar position="static" color={"transparent"}>
        <Toolbar>
          {/* <IconButton edge="start" 
                color="inherit" aria-label="menu">
                  <MenuIcon />
              </IconButton> */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <StyledTypography variant="h4">eShop</StyledTypography>
              <NavLink>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="#">Contact</StyledLink>
              </NavLink>
            </div>
            <span>Cart : &nbsp;<CartButton totalItems={totalItems} handleClick={handleClick} /></span>
          </div>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

export default NavBar;
