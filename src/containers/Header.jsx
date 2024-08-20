import React from "react";
import styled from "styled-components";
import Logo from "../assets/my-logo.svg";

const HeaderContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  padding: 24px;
`;

const MyLogo = styled.img`
  width: 100px;
  height: 100px;
  padding: 4px;
  border-radius: 12px;
  border: 2px solid black;
`;

const Header = () => {
  return (
    <HeaderContainer id="header">
      <MyLogo src={Logo} width="44px" height={"44px"} />
    </HeaderContainer>
  );
};

export default Header;