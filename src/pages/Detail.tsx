import React, {useState} from 'react';
import styled from "styled-components";
import MuteContent from "@/assets/images/muteContent.svg";
import SoundUpContent from "@/assets/images/soundupContent.svg";
import ShareExportButtons from "@/components/common/ShareExportButtons";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import {useLocation, useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {fetchContent, fetchContents} from "@/services/contentsService";

const DetailContainer = styled.main`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 110px;
  .btnContainer {
    position: absolute;
    top: 22px;
    right: 20px;
  }
  .titleContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h3 { font-size: 20px; }
    h4 { font-size: 16px; font-weight: normal }
    h2 { font-size: 24px; }
  }
  .textContainer {
    padding: 31px 24px;
    border-radius: 20px;
    background: #DBD6D6;
    color: #333;
    white-space: pre-line;
  }
  .audioContainer {
    border: 1px solid orange;
  }
  .evaluateContainer {
    * {
      background: linear-gradient(0deg, #EBEDEE, #EBEDEE);
      -webkit-background-clip: text;
      color: transparent;
    }
    .evaluateButtons {
      width: 90%;
      margin: 38px auto 0;
      display: flex;
      button {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        color: #EBEDEE;
        font-size: 14px;
        span, image {
          display: block;
          &image {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
`;

const Detail = () => {
    const [type, setType] = useState('audio');
    const { id } = useParams();
    const { data, status } = useQuery({
        queryKey: ['contents'],
        queryFn: id ? () => fetchContent(id) : undefined,
    })
    return (
        <DetailContainer className='main'>
            {data && status === 'success' &&
                <>
                <ShareExportButtons className='btnContainer' disabled={false} savedYn={data.savedYn} />
                <div className='titleContainer'>
                    <h3>{data.address}</h3>
                    <h4>{data.createAt}</h4>
                    <h2>{data.title}</h2>
                </div>
                {data.type === 'text' ? (
                    <div className='textContainer'>
                        {data.text}
                    </div>
                ) : (
                    <AudioPlayer />
                )}
                <div className='evaluateContainer'>
                    <p>콘텐츠를 평가해주세요.</p>
                    <div className='evaluateButtons'>
                        <button>
                            <img src={MuteContent} alt='Mute Icon'/>
                        </button>
                        <button>
                            <img src={SoundUpContent} alt='VolumeUp Icon'/>
                        </button>
                    </div>
                </div>
                </>
            }
        </DetailContainer>
    );
};

export default Detail;