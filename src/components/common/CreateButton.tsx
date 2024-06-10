import React, {useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router";

const AddBtn = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #6e61ca;
  opacity: .8;
  position: fixed;
  right: 1rem;
  bottom: 72px;
  z-index: 100;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 1px;
    height: 40px;
    background: #fff;
    transition: all .35s;
    &:last-child {
      height: 1px;
      width: 40px;
    }
  }
  &.clicked span {
    &:first-child { transform: translate(-50%, -50%) rotate(45deg); }
    &:last-child { transform: translate(-50%, -50%) rotate(45deg); }
  }
`;

const CreateButton = () => {
    const navigate = useNavigate();

    return (
        <AddBtn onClick={() => navigate('/create')} >
            <span />
            <span />
        </AddBtn>
    );
};

export default CreateButton;