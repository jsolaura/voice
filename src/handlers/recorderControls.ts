import {SetRecorder} from "../types/recorder";

export const startRecording = async (setRecorder: SetRecorder) => {
    try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setRecorder((prev) => {
            return {
                ...prev,
                initRecording: true,
                mediaStream: stream,

            }
        })
    } catch (err) {
        console.log(err)
    }
}

export const saveRecording = async (recorder: any, setRecorder: SetRecorder) => {
    if (recorder.state !== 'inactive') {
        const promptValue = prompt('오디오 이름을 설정해주세요!', '');
        console.log('promptValue');
        console.log(promptValue);
        setRecorder((prev) => {
            return {
                ...prev,
                audioName: promptValue !== '' && promptValue !== null ? promptValue : ''
            }
        })
        recorder.stop();
    }

}