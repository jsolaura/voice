import React from 'react';
import ModalPortal from "@/components/common/modal/ModalPortal";
import {useModal} from "@/hooks/useModal";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 100vw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300;
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
      &.reverse {
        flex-direction: row-reverse;
        button:first-child {
          border-right: 0;
        }
      }
      button {
        width: 50%;
        font-size: 18px;
        &:first-child {
          border-right: 1px solid #d9d9d9;
        }
      }
    }
    &.background {
      border: 0;
      background: #f4f4f4;
      .modalButtons {
        border-top: 1px solid #fff;
        .positive {
          background: #6E61CA;
          color: #fff;
          border-bottom-left-radius: 20px;
        }
      }
    }
  }
`;

const Modal = () => {
    const { modalDataState, closeModal } = useModal();
    const { title, content, reverse, background } = modalDataState;
    return (
        <>
        {modalDataState.isOpen && (
            <ModalPortal >
                <ModalContainer>
                    <div className={`modalBody ${background ? 'background' : ''}`}>
                        <div className='modalTitle'>
                            <p>{title}</p>
                            <span>{content}</span>
                        </div>
                        <div className={`modalButtons ${reverse ? 'reverse' : ''}`}>
                            <button onClick={closeModal}>아니오</button>
                            <button className='positive' onClick={modalDataState.callback}>네</button>
                        </div>
                    </div>
                </ModalContainer>
            </ModalPortal>
        )}
        </>
    );
};

export default Modal;