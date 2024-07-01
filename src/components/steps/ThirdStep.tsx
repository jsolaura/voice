import React, {ChangeEventHandler, useEffect, useState} from 'react';
import {CircularProgress, TextareaAutosize} from "@mui/material";
import {FormDataType} from "@/types/contents";
import HearingBtn from "@/assets/images/hearingBtn.svg";
import PausedBtn from "@/assets/images/pausedBtn.svg";
import StoppedBtn from "@/assets/images/stoppedBtn.svg";
import styled from "styled-components";
import {Interval, RecorderProps, RecorderStatusProps, TimeProps} from "@/types/audioPlayer";
import {formatTimes} from "@/utils/common";

const ThirdStepContainer = styled.article`
  width: 85%;
  margin: 0 auto;
  position: relative;
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
  .recording {
    .circle {
      position: relative;
      svg {
        overflow: visible;
      }
    }
    button {
      position: relative;
      margin: 32px 0;
      z-index: 100;
    }
  }
`;

const ThirdStep = ({ formData, handleChanged, recorder, recorderStatus }: { formData: FormDataType, handleChanged: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>, recorder: RecorderProps, recorderStatus: RecorderStatusProps }) => {
    const { startRecording, stopRecording, pauseRecording, status } = recorder;
    const { recordingStatus, pausedStatus, stoppedStatus } = recorderStatus;
    const [time, setTime] = useState<TimeProps>({ minutes: 0, seconds: 0 });
    const [progress, setProgress] = useState<number>(0);
    const normalise = (value: number) => Math.floor(((value - (value === 0 ? 0 : 1)) * 100) / (180 - 1));
    let recordingInterval: Interval = null;

    useEffect(() => {
        const MAX_RECORDER_TIME = 3;
        if (status === 'recording') {
            if (time.minutes === MAX_RECORDER_TIME) {
                stopRecording();
            }
            recordingInterval = setInterval(() => {
                setProgress(progress + 1);
                setTime((prev) => {
                    if (prev.minutes === MAX_RECORDER_TIME && prev.seconds === 0) {
                        typeof recordingInterval === 'number' && clearInterval(recordingInterval);
                        return prev;
                    }
                    if (prev.seconds >= 0 && prev.seconds < 59) {
                        return {
                            ...prev,
                            seconds: prev.seconds + 1,
                        }
                    } else if (prev.seconds === 59) {
                        return {
                            ...prev,
                            minutes: prev.minutes + 1,
                            seconds: 0,
                        }
                    } else return prev;
                })
            }, 1000);

        } else typeof recordingInterval === 'number' && clearInterval(recordingInterval);
        return () => {
            typeof recordingInterval === 'number' && clearInterval(recordingInterval);
        }
    })

    return (
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
                <div className='recording zHigh'>
                    <p>{formatTimes(time.minutes, true)}:{formatTimes(time.seconds)}</p>
                    <div className='circle'>
                        {recordingStatus &&
                            <CircularProgress
                                sx={{
                                    position: 'absolute',
                                    top: '49%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%) rotate(-90deg) !important',
                                    color: '#EBEDEE',
                                    filter: 'blur(4px)',
                                    overflow: 'visible'
                                }}
                                variant="determinate"
                                value={normalise(progress)}
                                size={140}
                                thickness={4}
                            />
                        }
                        <button onClick={pausedStatus ? startRecording : pauseRecording} className='p0'>
                            <img src={pausedStatus ? PausedBtn : stoppedStatus ? StoppedBtn: HearingBtn} alt='Recording button'/>
                        </button>
                    </div>
                    <p>{recordingStatus ? '듣고 있어요' : pausedStatus ? '이야기를 마치셨나요?' : '잘 들었어요.'}</p>
                </div>
            )}
        </ThirdStepContainer>
    )

};

export default ThirdStep;