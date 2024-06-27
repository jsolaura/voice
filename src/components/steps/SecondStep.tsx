import React, {Dispatch} from 'react';
import RecordingBtn from "@/assets/images/recordingBtn.svg";
import {FormDataType} from "@/types/contents";
import styled from "styled-components";

const SecondStepContainer = styled.article`
  display: flex;
  flex-direction: column;
  .recordingBtn {
    margin: 32px 0;
  }
`;
const SecondStep = ({ formData, activeStep, setFormData, setActiveStep, startRecording }: {
    formData: FormDataType,
    activeStep: number,
    setFormData:  Dispatch<React.SetStateAction<FormDataType>>,
    setActiveStep:  Dispatch<React.SetStateAction<number>>,
    startRecording: () => void
}) => {
    return (
        <SecondStepContainer onClick={() => setActiveStep(activeStep + 1)}>
            <p className='info'>아래를 클릭하면 녹음이 시작됩니다.</p>
            <button onClick={startRecording} className='recordingBtn p0'>
                <img src={RecordingBtn} alt='Recording button'/>
            </button>
            <button onClick={() => setFormData({ ...formData, type: 'text' })}>
                <p className='underline'>글로 쓸게요.</p>
            </button>
        </SecondStepContainer>
    )
}

export default SecondStep;