import React, {MouseEvent, useEffect, useRef, useState} from 'react';

const Recorder2 = () => {
    const [stopDisabled, setStopDisabled] = useState(true);
    const [isRecording, setIsRecording] = useState(false);

    let audioCtx: any;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mainSection = useRef<HTMLElement>(null);

    const [chunks, setChunks] = useState<any>();
    const [stream, setStream] = useState<MediaStream | null>(null);

    const [clipName, setClipName] = useState<null | string>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (canvasRef?.current && mainSection?.current) {
            window.onresize = () => {
                (canvasRef?.current as HTMLCanvasElement).width = (mainSection?.current as HTMLElement).offsetWidth;
            };

        }

    }, [])

    const startRecord = () => {
        if (navigator.mediaDevices.getUserMedia) {
            let onSuccess = (stream: MediaStream) => {
                const mediaRecorder = new MediaRecorder(stream);
                console.log("The mediaDevices.getUserMedia() method is supported.");
                mediaRecorder.start();
                setIsRecording(true);

                setStream(stream)
                visualize(stream);

                mediaRecorder.ondataavailable = (e) => {
                    let temp = [];
                    temp.push(e.data);
                    setChunks(temp);
                    console.log('ondataavailable !!!');
                    console.log(e)
                }

                mediaRecorder.onstop = (e) => {
                    const alertLabel = prompt (
                        'Enter a name for your sound clip?', 'Unnamed clip'
                    )
                    if (alertLabel === null) {
                        setClipName('Unnamed clip');
                    } else {
                        setClipName(alertLabel);
                    }
                    const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
                    const audioURL = window.URL.createObjectURL(blob);

                    setChunks([]);
                    if (audioRef.current) {
                        audioRef.current.src = audioURL;
                    }
                }
            }
            let onError = (err: any) => {
                console.log("The following error occured: " + err);
            }

            navigator.mediaDevices.getUserMedia({ audio: true }).then(onSuccess, onError);

        } else {
            console.log("MediaDevices.getUserMedia() not supported on your browser!");
        }

        console.log('startRecord');
    }

    const stopRecord = () => {
        console.log('stopRecord');
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        // mediaRecorder.stop();
        setIsRecording(false);
    }

    const visualize = (stream: MediaStream) => {
        if (!audioCtx) {
            audioCtx = new AudioContext();
        }
        const source = audioCtx.createMediaStreamSource(stream);

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);

        const draw = () => {
            const canvasCtx = (canvasRef?.current as HTMLCanvasElement).getContext('2d');
            if (canvasRef.current && canvasCtx) {
                const WIDTH = canvasRef.current.width;
                const HEIGHT = canvasRef.current.height;

                analyser.getByteTimeDomainData(dataArray);
                canvasCtx.fillStyle = "rgb(200, 200, 200)";
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = "rgb(0, 0, 0)";

                canvasCtx.beginPath();

                let sliceWidth = (WIDTH * 1.0) / bufferLength;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    let v = dataArray[i] / 128.0;
                    let y = (v * HEIGHT) / 2;

                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                canvasCtx.lineTo(canvasRef.current.width, canvasRef.current.height / 2);
                canvasCtx.stroke();
            }
        }
        requestAnimationFrame(draw);

    }

    const deleteClip = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.target !== null) {
            (e.target as HTMLButtonElement).closest('.clip')?.remove();
        }
        console.log(e.target as HTMLButtonElement);

    }

    const changeLabel = () => {
        const existingName = clipName;
        const newClipName = prompt('Enter a new name for your sound clip?');
        if (newClipName === null) {
            setClipName(existingName);
        } else {
            setClipName(newClipName);
        }
    }
    console.log(clipName)
    console.log(isRecording)

    return (
        <div className='recorder'>
            <header>
                <h1>Web dictaphone</h1>
            </header>

            <section ref={mainSection} className="main-controls">
                <canvas ref={canvasRef} className="visualizer" height="60px" />
                <div id="buttons">
                    <button
                        disabled={isRecording}
                        onClick={startRecord}
                        className={`record ${isRecording ? 'isRecording' : ''}`}
                    >
                        Record
                    </button>
                    <button
                        disabled={!isRecording}
                        onClick={stopRecord}
                        className={`stop ${isRecording ? 'stop' : ''}`}
                    >
                        Stop
                    </button>
                </div>
            </section>

            {clipName !== null && !isRecording &&  (
                <section className="sound-clips">
                    <article className='clip'>
                        <audio ref={audioRef} controls />
                        <div>
                            <p onClick={changeLabel}>{clipName}</p>
                            <button onClick={(e) => deleteClip(e)} className='delete'>Delete</button>
                        </div>
                    </article>
                </section>
            )}
        </div>
    );
};

export default Recorder2;