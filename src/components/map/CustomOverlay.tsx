import React from 'react';
import styled from "styled-components";
import {CustomOverlayProps} from "@/types/maps";
import MicIcon from "@/assets/images/mic.png";
import {useRecoilState} from "recoil";
import {useNavigate} from "react-router";
import {isLoggedInState} from "@/recoil/CommonAtom";
import {useModal} from "@/hooks/useModal";
import ShareExportButtons from "@/components/common/ShareExportButtons";

const OverlayContainer = styled.div`
  width: 214px;
  height: 187px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #222;
  font-size: 18px;
  background: #fff;
  border: 1px solid #d9d9d9;
  position: relative;
`;

const CustomOverlay = ({detail}: CustomOverlayProps) => {
    const navigate = useNavigate();
    const [isLoggedIn, ] = useRecoilState(isLoggedInState);
    const { openModal, closeModal } = useModal();

    const modalData = {
        title: '비회원으로 이용시 \n 사용에 제한이 생깁니다.',
        content: '로그인 하시겠습니까?',
        callback: () => {
            closeModal();
            navigate('/login');
        },
    }
    const moveToDetail = (id: string) => {
        if (isLoggedIn) {
            navigate(`/detail/${id}`);
        } else {
            openModal(modalData);
        }
    }
    return (
        <>
        <OverlayContainer id='customOverlay' onClick={() => moveToDetail(detail?.id)}>
            <img src={MicIcon} alt='micIcon' width={24} height={24}/>
            <div className='textContainer'>
                <p>{`${detail?.title}`}</p>
            </div>
            <ShareExportButtons />
        </OverlayContainer>
        </>
    );
};

export default CustomOverlay;