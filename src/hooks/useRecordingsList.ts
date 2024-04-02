import {useEffect, useState} from "react";
import {Audio} from "../types/recorder";
import generateKey from "../utils/generateKey";
import {deleteAudio} from "../handlers/recordingsList";

const useRecordingsList = (audio: string | null, audioName: string) => {
    const [recordings, setRecordings] = useState<Audio[]>([]);

    useEffect(() => {
        if (audio) {
            setRecordings((prev) => {
                return [...prev, { key: generateKey(), audio, name: audioName }]
            })
        }

    }, [audio]);

    return {
        recordings,
        deleteAudio: (audioKey: string) => deleteAudio(audioKey, setRecordings),
    }
}

export default useRecordingsList;