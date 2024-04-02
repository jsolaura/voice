import React, {useEffect, useState} from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';


const AudioRecord = () => {
    // const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    // if (!browserSupportsSpeechRecognition) {
    //     return <span>Browser doesn't support speech recognition.</span>
    // }
    const recorderControls = useAudioRecorder()
    const {
        startRecording,
        stopRecording,
        togglePauseResume,
        recordingBlob,
        isRecording,
        isPaused,
        recordingTime,
        mediaRecorder
    } = useAudioRecorder();

    const addAudioElement = (blob: Blob) => {
        console.log(blob);
        const url = URL.createObjectURL(blob);
        const audio = document.createElement('audio');
        audio.src = url;
        audio.controls = true;
        audio.setAttribute('controlsList', 'nodownload');

        document.body.appendChild(audio);
    };
    return (
        <>
            <div>
                {/*<p>Microphone: {listening ? 'on' : 'off'}</p>*/}
                {/*<button onClick={(e) => SpeechRecognition.startListening({ continuous: true, language: 'ko' })}>Start</button>*/}
                {/*<button onClick={SpeechRecognition.stopListening}>Stop</button>*/}
                {/*<button onClick={resetTranscript}>Reset</button>*/}
                {/*<p>{transcript}</p>*/}
            </div>
            <div>
                <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    recorderControls={recorderControls}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                        // autoGainControl,
                        // channelCount,
                        // deviceId,
                        // groupId,
                        // sampleRate,
                        // sampleSize,
                    }}
                    onNotAllowedOrFound={(err) => console.table(err)}
                    // downloadOnSavePress={true}
                    downloadFileExtension="webm"
                    mediaRecorderOptions={{
                        audioBitsPerSecond: 128000,
                    }}
                    // showVisualizer={true}
                />
                <br />
            </div>
        </>
    );
};

export default AudioRecord;