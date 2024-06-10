import React, {ChangeEventHandler, forwardRef} from 'react';
import {Input} from "@mui/material";
import {FormDataType} from "@/types/create";
import styled from "styled-components";

const FirstStepContainer = styled.article`
  width: 70%;
  margin: 0 auto;
  span {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    text-align: right;
  }
`;

const FirstStep = forwardRef(({ formData, handleChanged }: { formData: FormDataType, handleChanged: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> }, ref) => {
    return (
        <FirstStepContainer>
            <Input
                inputRef={ref}
                name='title'
                value={formData.title}
                onChange={handleChanged}
                maxRows={2}
                placeholder="제목을 입력해주세요"
                disableUnderline
                inputProps={{ maxLength: 20 }}
            />
            <span>{!formData.title ? 0 : formData.title.length}/20</span>
        </FirstStepContainer>
    )
})

export default FirstStep;