import React from 'react';
import styled from "styled-components";
import {CircularProgress} from "@mui/material";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 400;
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(2, 2, 2, .7);
  img {
    display: block;
    object-fit: contain;
    width: 30%;
  }
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <CircularProgress sx={{ color: 'white' }} />
        </LoadingContainer>
    );
};

export default Loading;