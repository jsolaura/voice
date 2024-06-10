import React from 'react';
import Menu from '@/assets/images/menu.svg';
import styled from "styled-components";
import {useNavigate} from "react-router";

const HamContainer = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 200;
`;

const MyPageHam = () => {
    const navigate = useNavigate();
    return (
        <HamContainer onClick={() => navigate('/myPage')}>
            <img src={Menu} alt='Menu bar' />
        </HamContainer>
    );
};

export default MyPageHam;