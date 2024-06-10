import React, {useState} from 'react';
import styled from "styled-components";
import MuteContent from "@/assets/images/muteContent.svg";
import SoundUpContent from "@/assets/images/soundupContent.svg";
import ShareExportButtons from "@/components/common/ShareExportButtons";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";

const DetailContainer = styled.main`
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

    const data = {
        id: 'safasdfasdfasdfasd',
        title: '내 목소리 평가좀!',
        latlng: {lat: 37.536402491731295, lng: 126.94057647402754},
        address: '마포구 공덕동',
        createAt: '2024.06.02',
        content: `오늘 공덕역 맛집 찾아서 너무 행복\n 여기서 오른쪽 골목길로 들어가면 있는 첫번째 집!\n 숙성회가 너무 맛있었다`
    }
    return (
        <DetailContainer className='main'>
            <ShareExportButtons className='btnContainer' disabled={false} isSaved={true} />
            <div className='titleContainer'>
                <h3>{data.address}</h3>
                <h4>{data.createAt}</h4>
                <h2>{data.title}</h2>
            </div>
            {type === 'text' ? (
                <div className='textContainer'>
                    {data.content}
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
        </DetailContainer>
    );
};

export default Detail;