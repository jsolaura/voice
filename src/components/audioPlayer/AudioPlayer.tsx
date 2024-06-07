import React, {useCallback, useRef, useState} from 'react';
import styled from "styled-components";
import TestAudio from "@/assets/1.mp3";
import PlayBtn from "@/assets/images/playBtn.svg";
import SkipBackBtn from "@/assets/images/skipBackBtn.svg";
import SkipFwdBtn from "@/assets/images/skipFwdBtn.svg";
import RepeatBtn from "@/assets/images/repeatBtn.svg";
import {Slider} from "@mui/material";
import ReactPlayer from "react-player";
import {durationFormat} from "@/utils/common";
import {HandleButtonType} from "@/types/audioPlayer";

const AudioContainer = styled.div`
  width: 100%;
  .controlsContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    position: relative;
    button:last-child {
      position: absolute;
      right: 0;
    }
  }
  .audioInfo {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
  }
  .MuiSlider-thumb, .MuiSlider-track  {
    color: #7b57e4 !important;
  }
  .MuiSlider-thumb {
    &.Mui-active, .Mui-focusVisible {
      box-shadow: unset;
    }
  }
  .MuiSlider-thumb::before, .MuiSlider-thumb::after { display: none }
  .MuiSlider-rail {
    color: #8f8180;
  }
`;

const handleButtons: HandleButtonType[] = [
    {
        alt: 'Skip back Button',
        src: SkipBackBtn,
        key: 'back',
    },
    {
        alt: 'Play Button',
        src: PlayBtn,
        key: 'play',
    },
    {
        alt: 'Skip forward Button',
        src: SkipFwdBtn,
        key: 'forward',
    },
    {
        alt: 'Repeat Button',
        src: RepeatBtn,
        key: 'repeat',
    },
]
const AudioPlayer = () => {
    const [play, setPlay] = useState<boolean>(false);
    const [seeking, setSeeking] = useState<boolean>(false)
    const [duration, setDuration] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const audioRef = useRef<ReactPlayer>(null);

    const handleControls = useCallback((key: string) => {
        if (key === 'play') {
            setPlay(!play)
        }
        if (key === 'back' || key === 'forward') {
            setSeeking(true);
            if (audioRef.current !== null) {
                const currentTime = audioRef.current.getCurrentTime();
                const num = key === 'forward' ? + 10 : - 10;
                audioRef.current.seekTo(Math.floor(currentTime) + num);
                setSeeking(false)
            }
        }
        if (key === 'repeat') handleEnded();

    }, [play, seeking]);

    const handleSeekChange = (e: any) => {
        if (audioRef.current !== null) {
            setPlay(true)
            audioRef.current.seekTo(e.target.value);
            setProgress(e.target.value)
        }
    }
    const handleEnded = () => {
        if (audioRef.current !== null) {
            audioRef.current.seekTo(0)
            setPlay(false)
            setProgress(0)
        }
    }
    return (
        <AudioContainer>
            <div className='player player-wrapper'>
                <Slider
                    value={progress}
                    max={Math.floor(duration)}
                    min={0}
                    step={1}
                    valueLabelFormat={() => durationFormat(progress)}
                    valueLabelDisplay="auto"
                    onChange={handleSeekChange}
                />
                <div className='audioInfo'>
                    <span>{durationFormat(progress)}</span>
                    <span>{durationFormat(duration)}</span>
                </div>
                <ReactPlayer
                    volume={1}
                    className='react-player'
                    ref={audioRef}
                    playing={play}
                    style={{ display: "none" }}
                    url={TestAudio}
                    onDuration={(duration) => {
                        setDuration(Math.floor(duration))
                    }}
                    onProgress={(state) => {
                        if (!seeking) setProgress(Math.floor(state.playedSeconds))
                    }}
                    onEnded={handleEnded}
                />
            </div>
            <div className='controlsContainer'>
                {handleButtons.map(btn => (
                    <button
                        key={btn.key}
                        onClick={() => handleControls(btn.key)}
                    >
                        <img src={btn.src} alt={btn.alt}/>
                    </button>
                ))}
            </div>
        </AudioContainer>
    );
};

export default AudioPlayer;