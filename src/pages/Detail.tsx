import React, {useState} from 'react';
import styled from "styled-components";
import MuteIcon from "@/assets/images/mute.svg";
import VolumeUpIcon from "@/assets/images/volumeUp.svg";
import ShareExportButtons from "@/components/common/ShareExportButtons";

const DetailContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 164px 24px;
  background: linear-gradient(180deg, #243D66 0%, #6E61CA 100%);
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 110px;
  color: #EBEDEE;
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
        <DetailContainer>
            <ShareExportButtons className='btnContainer' disabled={false} />
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
                <div className='audioContainer'>

                </div>
            )}
            <div className='evaluateContainer'>
                <p>콘텐츠를 평가해주세요.</p>
                <div className='evaluateButtons'>
                    <button>
                        <img src={MuteIcon} alt='Mute Icon'/>
                        <span>Mute</span>
                        <span>{type === 'text' ? '보고' : '듣고 '}싶지 않아요.</span>
                    </button>
                    <button>
                        <img src={VolumeUpIcon} alt='VolumeUp Icon'/>
                        <span>Sound-Up</span>
                        <span>더 많은 사람이<br/>{type === 'text' ? '보기' : '듣길'} 바래요.</span>
                    </button>
                </div>
            </div>
        </DetailContainer>
    );
};

export default Detail;