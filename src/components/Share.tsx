import React, {useEffect} from 'react';
import styled from "styled-components";

const ShareButtonContainer = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  button {
    border: 1px solid #000;
    background: #fff;
    color: #000;
    padding: 0.5rem;
    cursor: pointer;
  }
`

const Share = () => {
    const { Kakao } = window;

    const shareKakao = () => {
        try {
            Kakao.Share.sendDefault({
                objectType: 'location',
                address: '경기 성남시 분당구 판교역로 166 3층',
                addressTitle: '카카오 판교아지트 카페톡',
                content: {
                    title: '신메뉴 출시♥︎ 체리블라썸라떼',
                    description: '이번 주는 체리블라썸라떼 1+1',
                    imageUrl:
                        'http://k.kakaocdn.net/dn/bSbH9w/btqgegaEDfW/vD9KKV0hEintg6bZT4v4WK/kakaolink40_original.png',
                    link: {
                        // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                        mobileWebUrl: 'https://developers.kakao.com',
                        webUrl: 'https://developers.kakao.com',
                    },
                },
                social: {
                    likeCount: 286,
                    commentCount: 45,
                    sharedCount: 845,
                },
                buttons: [
                    {
                        title: '웹으로 보기',
                        link: {
                            mobileWebUrl: 'https://developers.kakao.com',
                            webUrl: 'https://developers.kakao.com',
                        },
                    },
                ],
            })
        } catch (e) {
            console.log(e);
        }
    }
    const handleCopyLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(window && window.location.href)
                .then(() => {
                    alert("링크가 복사되었습니다!");

                })
                .catch(() => {
                    alert("복사를 다시 시도해주세요.");
                });
        }

    }
    return (
        <ShareButtonContainer>
            <button onClick={shareKakao}>
                카카오톡 공유하기
            </button>
            <button onClick={handleCopyLink}>링크 복사하기</button>

        </ShareButtonContainer>
    );
};

export default Share;