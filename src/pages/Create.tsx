import React, {FormEvent, FormEventHandler, Fragment, useCallback, useRef, useState} from 'react';
import {InputBaseProps, MobileStepper} from "@mui/material";
import PrevBtn from "@/assets/images/expandLeft.svg";
import NextBtn from "@/assets/images/nextBtn.svg";
import CheckBtn from "@/assets/images/checkBtn.svg";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {addressState} from "@/recoil/MapAtom";
import {Content, FormDataType} from "@/types/contents";
import FirstStep from "@/components/steps/FirstStep";
import ThirdStep from "@/components/steps/ThirdStep";
import LastStep from "@/components/steps/LastStep";
import SecondStep from "@/components/steps/SecondStep";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createContent, fetchContents} from "@/services/contentsService";
import {useNavigate} from "react-router";

const CreateContainer = styled.main`
  h2 {
    margin-bottom: 110px;
  }
  .contentContainer {
    width: 100%;
    min-height: 256px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  .nextBtn {
    img {
      margin-bottom: 10px;
    }
  }
  .prevBtn {
    position: fixed;
    top: 18px;
    left: 11px;
    padding: 0;
  }
  p, button {
    font-size: 17px;
    color: #E5E5E5FF !important;
  }
  .MuiInput-root {
    width: 100%;
    .MuiInputBase-input {
      font-size: 20px;
      color: #E5E5E5FF;
      border-bottom: 2px solid #C282FAFF !important;
      &::placeholder { color: #E5E5E5FF; }
      &:focus { border-bottom: 2px solid #C282FAFF !important; }
    }
  }
  .MuiMobileStepper-root {
    background: none;
    justify-content: center;
  }
  .MuiLinearProgress-root {
    display: none;
    background: #fff !important;
  }
`;

const Create = () => {
    const [formData, setFormData] = useState<FormDataType>({
        title: '',
        type: 'audio',
        text: '',
        displayedYn: 'y',
    })
    const [address, ] = useRecoilState(addressState);
    const [activeStep, setActiveStep] = useState<number>(0);
    const maxSteps = 3;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleChanged = useCallback((e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }, [formData]);

    const handleNext = () => {
        if (activeStep !== maxSteps && activeStep !== 0) setActiveStep((prev) => prev + 1);
    };

    const handleSkip = (isSkip: boolean) => {
        if (activeStep === 0) {
            if (isSkip) {
                setFormData({...formData, title: ''});
                setActiveStep((prev) => prev + 1);
            } else {
                if (formData.title === '') {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                } else  {
                    setActiveStep((prev) => prev + 1);
                }
            }
        }
    }
    //
    // const createContentMutation = useMutation({
    //     mutationFn: (data: FormDataType) => createContent(data),
    //     onSettled: () => queryClient.invalidateQueries({ queryKey: ['contents'] })
    // })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // createContentMutation.mutate(formData);
        // setFormData({
        //     title: '',
        //     type: 'audio',
        //     text: '',
        //     isDisplay: true,
        // })
        // navigate(-1);
    }

    const steps = [
        {
            index: 0,
            element: <FirstStep formData={formData} handleChanged={handleChanged} ref={inputRef} />
        },
        {
            index: 1,
            element: <SecondStep formData={formData} activeStep={activeStep} setFormData={setFormData} setActiveStep={setActiveStep} />
        },
        {
            index: 2,
            element: <ThirdStep formData={formData} handleChanged={handleChanged} />
        },
        {
            index: 3,
            element: <LastStep formData={formData} setFormData={setFormData} />
        },
    ]
    console.log(formData)
    return (
        <CreateContainer className='main'>
            <form onSubmit={handleSubmit}>
                {activeStep > 0 &&
                    <button className='prevBtn' onClick={() => setActiveStep((prev) => prev - 1)}>
                        <img src={PrevBtn} alt='Expend Left Button' />
                    </button>
                }
                <h2>{address.split(' ').slice(1, 3).join(' ')}에 기록하기</h2>
                <div className='contentContainer'>
                    {steps.map((step) =>
                        step.index === activeStep
                            && <Fragment key={`step${activeStep}`}>{step.element}</Fragment>
                    )}
                </div>
                <MobileStepper
                    variant="progress"
                    position='static'
                    sx={{ bottom: '200px', justifyContent: activeStep === 0 ? 'center' : 'space-between' }}
                    steps={maxSteps}
                    activeStep={activeStep}
                    backButton={null}
                    nextButton={
                            <button className='nextBtn' type={activeStep === maxSteps ? 'submit' : 'button'} onClick={handleNext}>
                                <img src={activeStep === maxSteps ? CheckBtn : NextBtn} alt='Next button' onClick={() => handleSkip(false)} />
                                {activeStep == 0 && (
                                    <p className='underline' onClick={() => handleSkip(true)}>건너뛰기</p>
                                )}
                            </button>
                    }
                />
            </form>
        </CreateContainer>
    );
};

export default Create;