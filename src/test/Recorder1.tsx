import React, {useState} from 'react';

const Recorder1 = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
    const [transcriptLength, setTranscriptLength] = useState(0);

    console.log(isRecording)
    console.log('stream!!!!')
    console.log(stream)
    console.log(timerInterval)
    console.log(transcriptLength)
    const startRecording = async () => {
        console.log('recording started');
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // const speakerStream = await (navigator as any).mediaDevices.getDisplayMedia({
            //     audio: true,
            //     video: false,
            // })

            console.log(audioStream)
            const audioContext = new (window as any).AudioContext();
            const micSource = audioContext.createMediaStreamSource(audioStream);
            // const speakerSource = audioContext.createMediaStreamSource(speakerStream);

            const destination = audioContext.createMediaStreamDestination();
            micSource.connect(destination);
            // speakerSource.connect(destination);
            setIsRecording(true);
            setStream(destination.stream);
            console.log('destination!!!');
            console.log(destination);

            const mimeTypes = ['audio/mp4', 'audio/webm'].filter((type) => MediaRecorder.isTypeSupported(type));

            if (mimeTypes.length === 0) return alert('Browser not supported');

            setTimerInterval(
                setInterval(() => {
                    setTranscriptLength((t) => t + 1);
                }, 1000)
            )

            let recorder = new MediaRecorder(destination.stream, { mimeType: mimeTypes[0] });

            recorder.addEventListener('dataavailable', async (event) => {
                recorder.start(1000)
            })

        } catch (e) {
            console.log('Error accessing media devices:', e);
        }
    }

    const stopRecording = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false);
        clearInterval(timerInterval!);
        console.log('recording stopped');

    }
    return (
        <div className='recorder'>
            <button onClick={startRecording}>Start</button>
            <button onClick={stopRecording}>Stop</button>
        </div>
    );
};

export default Recorder1;