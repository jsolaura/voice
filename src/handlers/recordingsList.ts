import {SetRecordings} from "../types/recorder";

export const deleteAudio = (audioKey: string, setRecordings: SetRecordings) => {
    setRecordings((prev) => prev.filter((record) => record.key !== audioKey));

}