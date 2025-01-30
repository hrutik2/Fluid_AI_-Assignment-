import { Link } from "react-router-dom";
import styled from "styled-components";
 const Navbar=()=>{
    return(
        <Container>
            <StyledLink to="/">Home</StyledLink>
            <div>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/singup">Signup</StyledLink>
            </div>
            
        </Container>
    )
}   

export default Navbar;
const Container=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    padding-left: 100px;
    padding-right: 100px;
    background-color:cyan;
    div{
        display: flex;
        gap: 50px;
    }
    @media (max-width: 500px) {
        padding-left: 10px;
        padding-right: 10px;
        div{
            gap: 10px;
        }

    }
`

const StyledLink=styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 20px;
    font-weight: bold;
  
`

