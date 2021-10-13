import styled from 'styled-components'
// Components
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
    display: flex;
    flex-grow: 1; 
    margin-bottom: 40px;   
`;

export const StyledTypography = styled(Typography)`
    padding: 0 10px;
`;
export const NavLink = styled.div`
    margin-left: 10px;
    display: flex;
`;
export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-size: 20px;
    margin-left: 20px;

    &:hover {
      color:lightblue;
    }
`;