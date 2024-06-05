import React from 'react';
import ModalPortal from "@/components/common/modal/ModalPortal";
import {useModal} from "@/hooks/useModal";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  .modalBody {
    width: 300px;
    height: auto;
    border: 1px solid #d9d9d9;
    border-radius: 20px;
    background: #fff;
    .modalTitle {
      padding: 36px 46px 15px;
      text-align: center;
      p {
          font-size: 18px;
          margin-bottom: 14px;
      }
      span {
        font-size: 14px;
        color: #9d9a9a;
      }
    }
    .modalButtons {
      width: 100%;
      height: 58px;
      display: flex;
      border-top: 1px solid #d9d9d9;
      button {
        width: 50%;
        font-size: 18px;
        &:first-child {
          border-right: 1px solid #d9d9d9;
        }
      }
    }
  }
`;

const Modal = () => {
    const { modalDataState, closeModal } = useModal();
    const { title, content } = modalDataState;
    return (
        <>
        {modalDataState.isOpen && (
            <ModalPortal >
                <ModalContainer>
                    <div className='modalBody'>
                        <div className='modalTitle'>
                            <p>{title}</p>
                            <span>{content}</span>
                        </div>
                        <div className='modalButtons'>
                            <button onClick={closeModal}>아니오</button>
                            <button onClick={modalDataState.callback}>네</button>
                        </div>
                    </div>
                </ModalContainer>
            </ModalPortal>
        )}
        </>
    );
};

export default Modal;