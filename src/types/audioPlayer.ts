import {StatusMessages} from "react-media-recorder";

export type HandleButtonType = {
    alt: string;
    src: string | undefined;
    key: string;
}

export type TimeProps = {
    minutes: number;
    seconds: number;
}

export type Interval = null | number | ReturnType<typeof setInterval>

export type RecorderProps = {
    startRecording: () => void;
    stopRecording: () => void;
    pauseRecording: () => void;
    status: StatusMessages;
}
export type RecorderStatusProps = {
    recordingStatus: boolean;
    pausedStatus: boolean;
    stoppedStatus: boolean;
}