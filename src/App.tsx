import React, {useEffect} from 'react';
import './App.css';
import RecorderControls from "./components/RecorderControls";
import RecordingsList from "./components/RecordingsList";
import useRecorder from "./hooks/useRecorder";
import Share from "./components/Share";
import Map from "@/components/Map";

declare global {
    interface Window {
        Kakao: any;
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
            {/*<RecorderControls recorderState={recorderState} handlers={handlers} text={text} isListening={isListening} hasRecognitionSupport={hasRecognitionSupport}/>*/}
            {/*<RecordingsList audio={audio} audioName={audioName}/>*/}
            {/*<Share />*/}
            <Map />
        </div>
    );
}

export default App;
