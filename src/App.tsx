import React, {useEffect} from 'react';
import './App.css';
import AudioRecord from "./test/AudioRecord";
import Recorder2 from "./test/Recorder2";
import RecorderControls from "./components/RecorderControls";
import RecordingsList from "./components/RecordingsList";
import useRecorder from "./hooks/useRecorder";
import Share from "./components/Share";

declare global {
    interface Window {
        Kakao: any;
        webkitSpeechRecognition: any;
    }

}

function App() {
    const { recorderState, handlers, text, isListening, hasRecognitionSupport } = useRecorder();
    const { audio, audioName } = recorderState;
    const { Kakao } = window;
    useEffect(() => {
        Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }, [])
    return (
        <div className="App">
            <RecorderControls recorderState={recorderState} handlers={handlers} text={text} isListening={isListening} hasRecognitionSupport={hasRecognitionSupport}/>
            <RecordingsList audio={audio} audioName={audioName}/>
            <Share />
        </div>
    );
}

export default App;
