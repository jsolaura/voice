import React from 'react';
import styled from "styled-components";
import background from "@/assets/images/background-header.png";

const HeaderContainer = styled.div`
  width: 100vw;
  height: 25%;
  max-height: 250px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('${background}') no-repeat center center / 100% 100%;
  font-size: 18px;
`
const Header = () => {
    return (
        <HeaderContainer>
            <p>
                ‘마포구 도화동’에서 <br/>
                지금 떠오른는 느낌, 생각을 기록해보세요.
            </p>
        </HeaderContainer>
    );
};

export default Header;