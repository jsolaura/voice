import React from 'react';
import styled from "styled-components";
import background from "@/assets/images/background-header.png";
import {useRecoilState} from "recoil";
import {addressState} from "@/recoil/MapAtom";

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
  transition: all .35s;
  opacity: 0;
  &.show {
    opacity: 1;
  }
`
const Header = () => {
    const [address, ] = useRecoilState(addressState);
    return (
        <HeaderContainer className={address !== '' ? 'show' : ''}>
            <p>
                ‘{address}’에서 <br/>
                지금 떠오른는 느낌, 생각을 기록해보세요.
            </p>
        </HeaderContainer>
    );
};

export default Header;