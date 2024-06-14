import React, {ChangeEventHandler} from 'react';
import {TextareaAutosize} from "@mui/material";
import {FormDataType} from "@/types/contents";
import RecordingBtn from "@/assets/images/recordingBtn.svg";
import styled from "styled-components";

const ThirdStepContainer = styled.article`
  width: 85%;
  margin: 0 auto;
  position: relative;
  span {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  textarea {
    width: 100%;
    height: auto;
    min-height: 180px;
    border-radius: 20px;
    background: rgba(235, 237, 238, 0.2);
    padding: 20px;
    color: rgba(229, 229, 229, 1);
    font-size: 17px;
    outline: none;
    &::placeholder {
      color: rgba(229, 229, 229, 1);
    }
  }
`;
const ThirdStep = ({ formData, handleChanged }: { formData: FormDataType, handleChanged: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> }) => (
    <ThirdStepContainer>
        {formData.type === 'text' ? (
            <div className='description'>
                <TextareaAutosize
                    name='text'
                    value={formData.text}
                    onChange={handleChanged}
                    maxLength={199}
                    placeholder='떠오르는 생각, 느낌을 자유롭게 적어주세요.'
                />
                <span>{!formData.text ? 0 : formData.text.length}/200</span>
            </div>
        ) : (
            <div className='recording'>
                <img src={RecordingBtn} alt='Recording button'/>
            </div>
        )}
    </ThirdStepContainer>
);

export default ThirdStep;