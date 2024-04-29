import React, {Dispatch, SetStateAction} from 'react';
import styled from "styled-components";
import Marker = kakao.maps.Marker;

interface DetailProps {
    openDetail: boolean;
    setOpenDetail: Dispatch<SetStateAction<boolean>>;
    detail: {
        title: string;
        latlng: kakao.maps.LatLng;
    }
}
const DetailContainer = styled.div`
  position: fixed;
  width: 0;
  height: 0;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  z-index: -100;
  transition: transform .35s;
  &.openDetail {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    transform: translateY(0);
    background: #fff;
    color: #000;
    z-index: 1000;
    
  }
`;
const Detail = ({ openDetail, setOpenDetail, detail }: DetailProps) => {
    return (
        <DetailContainer className={openDetail ? 'openDetail' : ''}>
            <h1>Detail Page</h1>

            {detail?.latlng !== null &&
                <h3>
                    위도 - {detail?.latlng.getLat()}
                    <br/>
                    경도 - {detail?.latlng.getLng()}
                </h3>
            }
            <button onClick={() => setOpenDetail(false)}>
                X
            </button>

        </DetailContainer>
    );
};

export default Detail;