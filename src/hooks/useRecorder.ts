import {Recorder, Interval, MediaRecorderEvent, AudioTrack} from "../types/recorder";
import {useEffect, useState} from "react";
import {saveRecording, startRecording} from "../handlers/recorderControls";
export interface IWindow extends Window {
    webkitSpeechRecognition: any;
}
const initialState: Recorder = {
    recordingMinutes: 0,
    recordingSeconds: 0,
    initRecording: false,
    mediaStream: null,
    mediaRecorder: null,
    audio: null,
    audioName: '',
    script: '',
};

let mic: any = null;
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const {webkitSpeechRecognition} : IWindow = <IWindow>window;
    mic = new webkitSpeechRecognition();
    mic.continuous = true;
    mic.interimResults = true;
    mic.lang = 'ko-KR';

}

const useRecorder = () => {
    const [recorderState, setRecorderState] = useState<Recorder>(initialState);

    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        // handleListen()
    }, [isListening]);

    // const handleListen = () => {
    //     if (isListening) {
    //         mic.start();
    //         mic.onend = () => {
    //             console.log('continue..');
    //             mic.start();
    //         }
    //     } else {
    //         mic.stop();
    //         mic.onend = () => {
    //             console.log('stopped mic on click');
    //         }
    //     }
    //     mic.onstart = () => {
    //         console.log('Mics on')
    //     }
    //     mic.onresult = (event: SpeechRecognitionEvent) => {
    //         console.log('event.results');
    //         console.log(event);
    //         const transcript = Array.from(event.results)
    //             .map(result => result[0])
    //             .map(result => result.transcript)
    //             .join('');
    //         console.log(transcript);
    //         setText(transcript);
    //         mic.onerror = (event: any) => {
    //             console.log(event.error);
    //
    //         }
    //     }
    // }

    // Time interval
    useEffect(() => {
        const MAX_RECORDER_TIME = 3;
        let recordingInterval: Interval = null;

        // start recording
        if (recorderState.initRecording) {
            recordingInterval = setInterval(() => {
                setRecorderState((prev) => {
                    // when recorded till max minutes
                    if (prev.recordingMinutes === MAX_RECORDER_TIME && prev.recordingSeconds === 0) {
                        typeof recordingInterval === 'number' && clearInterval(recordingInterval);
                        return prev;
                    }

                    // seconds control
                    if (prev.recordingSeconds >= 0 && prev.recordingSeconds < 59) {
                        return {
                            ...prev,
                            recordingSeconds: prev.recordingSeconds + 1,
                        }
                    } else if (prev.recordingSeconds === 59) {
                        return {
                            ...prev,
                            recordingMinutes: prev.recordingMinutes + 1,
                            recordingSeconds: 0,
                        }
                    } else return prev;
                })
            }, 1000);
        }
        else typeof recordingInterval === 'number' && clearInterval(recordingInterval);

        return () => {
            typeof recordingInterval === 'number' && clearInterval(recordingInterval);
        }
    });
    console.log(recorderState);
    useEffect(() => {
        setRecorderState((prev) => {
            if (prev.mediaStream) {
              return {
                  ...prev,
                  mediaRecorder: new MediaRecorder(prev.mediaStream)
              }
            } else return prev;
        })

    }, [recorderState.mediaStream]);
    useEffect(() => {
        const recorder = recorderState.mediaRecorder;
        let chunks: Blob[] = [];

        // start audio and setting when audio stop
        if (recorder && recorder.state === 'inactive') {
            recorder.start();

            recorder.ondataavailable = (e: MediaRecorderEvent) => {
                chunks.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/mp4; codecs=opus' });
                chunks = [];

                setRecorderState((prev: Recorder) => {
                    if (prev.mediaRecorder) {
                        return {
                            ...initialState,
                            audio: window.URL.createObjectURL(blob),
                            audioName: prev.audioName,
                        }
                    } else return initialState;
                })
            }
        }

        return () => {
            if (recorder) recorder.stream.getAudioTracks().forEach((track: AudioTrack) => track.stop());
        }

    }, [recorderState.mediaRecorder]);
    const startRecordingAction = async () => {
        await startRecording(setRecorderState);
        await setText('');
        setIsListening(true);
        // startListening();
    }
    const stopRecordingAction = async () => {
        // const promptValue = prompt('오디오 이름을 설정해주세요!', '');
        // setRecorderState({...recorderState, audioName: promptValue ? promptValue : ''})
        // setRecorderState({...recorderState, audioName: promptValue})
        await saveRecording(recorderState.mediaRecorder, setRecorderState);

        setIsListening(false);
    }
    return {
        recorderState,
        handlers: {
            startRecording: () => startRecordingAction(),
            cancelRecording: () => setRecorderState(initialState),
            saveRecording: () => stopRecordingAction(),
        },
        text,
        isListening,
        hasRecognitionSupport: !!mic,
    }
}

export default useRecorder;