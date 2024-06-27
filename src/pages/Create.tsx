import React, {FormEvent, Fragment, useCallback, useRef, useState} from 'react';
import {MobileStepper} from "@mui/material";
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
import {useNavigate} from "react-router";
import {useReactMediaRecorder} from "react-media-recorder";
import {RecorderProps, RecorderStatusProps} from "@/types/audioPlayer";

const CreateContainer = styled.main`
  &.recording {
    position: relative;
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }
  }
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
  .none {
    display: none;
  }
`;

const Create = () => {
    const [formData, setFormData] = useState<FormDataType>({
        title: '',
        type: 'audio',
        text: '',
        displayedYn: 'y',
        audioFile: ''
    })
    const [address, ] = useRecoilState(addressState);
    const [activeStep, setActiveStep] = useState<number>(0);
    const maxSteps = 3;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { status, startRecording, pauseRecording, stopRecording, clearBlobUrl, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
    const recorder: RecorderProps = { status, startRecording, pauseRecording, stopRecording };
    const recorderStatus: RecorderStatusProps = {
        recordingStatus: status === 'recording' || (status !== 'paused' && status !== 'stopping' && status !== 'stopped' && status !== 'idle'),
        pausedStatus:  status === 'paused',
        stoppedStatus:  status === 'stopping' || status === 'stopped',
    }

    const handleChanged = useCallback((e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }, [formData]);

    const handleGoBack = () => {
        if (activeStep === 3) {
            setActiveStep(1)
        } else setActiveStep((prev) => prev - 1)
        if (activeStep === 2) {
            clearBlobUrl();
        }
    }

    const handleNext = async () => {
        if (activeStep !== maxSteps && activeStep !== 0) {
            if (activeStep === 2 && recorderStatus.pausedStatus) {
                await stopRecording();
                await setFormData({ ...formData, audioFile: mediaBlobUrl });
            } else setActiveStep((prev) => prev + 1);
        }
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

    const initRecording = async () => {
        await setFormData({ ...formData, type: 'audio', text: '' })
        await setActiveStep(activeStep + 1);
        await startRecording();
    }

    const steps = [
        {
            index: 0,
            element: <FirstStep formData={formData} handleChanged={handleChanged} ref={inputRef} />
        },
        {
            index: 1,
            element: <SecondStep formData={formData} activeStep={activeStep} setFormData={setFormData} setActiveStep={setActiveStep} startRecording={initRecording} />
        },
        {
            index: 2,
            element: <ThirdStep formData={formData} handleChanged={handleChanged} recorder={recorder} recorderStatus={recorderStatus} />
        },
        {
            index: 3,
            element: <LastStep formData={formData} setFormData={setFormData} />
        },
    ]

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
    return (
        <CreateContainer className={`main ${recorderStatus.recordingStatus ? 'recording' : ''}`}>
            <form onSubmit={handleSubmit}>
                {activeStep > 0 &&
                    <button className='prevBtn' onClick={handleGoBack}>
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
                        <button className={`nextBtn ${activeStep === 1 ? 'none' : ''}`} type={activeStep === maxSteps ? 'submit' : 'button'} onClick={handleNext}>
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