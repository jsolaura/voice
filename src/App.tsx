import React from 'react';
import './App.css';
import AudioRecord from "./test/AudioRecord";
import Recorder2 from "./test/Recorder2";
import RecorderControls from "./components/RecorderControls";
import RecordingsList from "./components/RecordingsList";
import useRecorder from "./hooks/useRecorder";


function App() {
    const { recorderState, handlers, text, isListening, hasRecognitionSupport } = useRecorder();
    const { audio, audioName } = recorderState;
    console.log(audio)
    console.log('recorderState!!!!!!!!!1')
    console.log(recorderState)
    return (
        <div className="App">
            <RecorderControls recorderState={recorderState} handlers={handlers} text={text} isListening={isListening} hasRecognitionSupport={hasRecognitionSupport}/>
            <RecordingsList audio={audio} audioName={audioName}/>
            {/*<AudioRecord />*/}
            {/*<Recorder2 />*/}
        </div>
    );
}

export default App;
