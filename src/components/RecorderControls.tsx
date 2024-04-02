import React from 'react';
import {RecorderControlsProps} from "../types/recorder";
import {formatTimes} from "../utils/formatDateTime";
import styled from "styled-components";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

const ControlsContainer = styled.section`
  //height: 15%;
  margin-bottom: 2rem;
  .recorder-display-container {
      display: flex;
      justify-content: space-between;
      padding: 2rem;

    .recorder-display {
      //width: 50%;
      font-size: 2rem;
      display: flex;

      @keyframes animated-block {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      .recording-time {
        //width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        .recording-indicator {
          width: 10px;
          height: 10px;
          margin-right: 0.5rem;
          border-radius: 50%;
          opacity: 0;
          &.initRecording {
            opacity: 1;
            background: #099fff;
            animation-name: animated-block;
            animation-duration: 2s;
            animation-iteration-count: infinite;
          }
        }
      }
      .cancel-button-container {
        width: 20%;
        display: grid;
        place-content: center;
        animation-name: animated-block;
        animation-duration: 2s;
        margin-left: 1rem;
        button {
          font-size: 1rem;
        }
      }
    }
  }
  .start-button, .cancel-button {
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
  .cancel-button {
    width: 25px;
    height: 25px;
    &:hover {
      color: #fd1c03;
    }
  }
  .start-button-container {
    .start-button {
        &:hover {
        }
    }
  }
`;

const RecorderControls = ({ recorderState, handlers, text, isListening, hasRecognitionSupport }: RecorderControlsProps) => {
    const { recordingMinutes, recordingSeconds, initRecording, script } = recorderState;
    const { startRecording, cancelRecording, saveRecording} = handlers;
    // const { text, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognition();

    console.log(recorderState)
    console.log(text)

    return (
        <ControlsContainer>
            <article className='recorder-display-container'>
                <div className='recorder-display'>
                    <div className='recording-time'>
                        <div className={`recording-indicator ${initRecording ? 'initRecording' : ''}`} />
                        <span>{formatTimes(recordingMinutes)}</span>
                        <span>:</span>
                        <span>{formatTimes(recordingSeconds)}</span>
                    </div>
                    {initRecording && (
                        <div className='cancel-button-container'>
                            <button className='cancel-button' title='Cancel recording' onClick={cancelRecording}>
                                ❌
                            </button>
                        </div>
                    )}
                </div>
                <div className='start-button-container'>
                    {initRecording ? (
                        <button
                            className='start-button'
                            title='Save recording'
                            disabled={recordingSeconds === 0}
                            onClick={saveRecording}
                        >
                            🎙️
                        </button>
                    ) : (
                        <button
                            className='start-button'
                            title='Start recording'
                            onClick={startRecording}
                        >
                            🛑 🎙️
                        </button>
                    )}
                </div>
            </article>
            {initRecording &&
                hasRecognitionSupport && (
                    <article>
                        {isListening ? <div>Your browser is currently listening</div> : null}
                        {/*<h1>*/}
                        {/*    text*/}
                        {/*</h1>*/}
                        <h1>{text}</h1>
                    </article>

                )
            }

        </ControlsContainer>
    );
};

export default RecorderControls;