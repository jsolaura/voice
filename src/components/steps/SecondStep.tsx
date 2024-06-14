import React, {Dispatch} from 'react';
import RecordingBtn from "@/assets/images/recordingBtn.svg";
import {FormDataType} from "@/types/contents";
import styled from "styled-components";

const SecondStepContainer = styled.article`
  display: flex;
  flex-direction: column;
`;
const SecondStep = ({ formData, activeStep, setFormData, setActiveStep }: {
    formData: FormDataType,
    activeStep: number,
    setFormData:  Dispatch<React.SetStateAction<FormDataType>>,
    setActiveStep:  Dispatch<React.SetStateAction<number>>
}) => (
    <SecondStepContainer onClick={() => setActiveStep(activeStep + 1)}>
        <button onClick={() => setFormData({ ...formData, type: 'audio', text: '' })} className='p0'>
            <img src={RecordingBtn} alt='Recording button'/>
        </button>
        <button onClick={() => setFormData({ ...formData, type: 'text' })}>
            <p className='underline'>글로 쓸게요.</p>
        </button>
    </SecondStepContainer>
)

export default SecondStep;