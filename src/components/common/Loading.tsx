import React from 'react';
import LoadingImage from "@/assets/images/loading.gif";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    object-fit: contain;
    width: 70%;
  }
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <img src={LoadingImage} alt='loadingGif' />
        </LoadingContainer>
    );
};

export default Loading;