import React, {Dispatch} from 'react';
import {FormDataType} from "@/types/contents";
import styled from "styled-components";

const LastStepContainer = styled.article`
  width: 75%;
  margin: 0 auto;
  p {
    text-align: center;
    padding: 20px 0;
    margin-bottom: 62px;
  }
  .buttons {
    display: flex;
    button {
      width: 50%;
      padding: 18px 0;
      border-radius: 20px;
      &.active {
        border-radius: 20px;
        background: #C282FA7F;
      }
    }
  }
`;
const LastStep = ({ formData, setFormData }: {
    formData: FormDataType,
    setFormData:  Dispatch<React.SetStateAction<FormDataType>>,
}) => (
    <LastStepContainer>
        <p>공개 여부를 선택해주세요.</p>
        <div className='buttons'>
            <button onClick={() => setFormData({ ...formData, displayedYn: 'y' })} className={formData.displayedYn === 'y' ? 'active' : ''}>공개</button>
            <button onClick={() => setFormData({ ...formData, displayedYn: 'n' })} className={formData.displayedYn === 'n' ? 'active' : ''}>비공개</button>
        </div>
    </LastStepContainer>

);

export default LastStep;