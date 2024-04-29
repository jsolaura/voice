import React, {Dispatch, SetStateAction} from 'react';
import styled from "styled-components";
import {DetailProps} from "@/types/maps";

const DetailContainer = styled.div`
  position: fixed;
  width: 0;
  height: 0;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  z-index: -100;
  transition: transform .35s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  &.openDetail {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    transform: translateY(0);
    background: #fff;
    color: #000;
    z-index: 1000;
  }
  button {
    cursor: pointer;
    padding: 1rem;
    
  }
`;
const Detail = ({ openDetail, setOpenDetail, location }: DetailProps) => {
    return (
        <DetailContainer className={openDetail ? 'openDetail' : ''}>
            <h1>Detail Page</h1>

            {location?.latlng !== null &&
                <h3>
                    위도 - {location?.latlng.getLat()}
                    <br/>
                    경도 - {location?.latlng.getLng()}
                </h3>
            }
            <button onClick={() => setOpenDetail(false)}>
                X
            </button>

        </DetailContainer>
    );
};

export default Detail;