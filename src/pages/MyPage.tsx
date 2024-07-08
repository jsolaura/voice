import React from 'react';
import styled from "styled-components";
import PrevBtn from "@/assets/images/expandLeft.svg";
import {useNavigate} from "react-router";
import BookmarkFillIcon from "@/assets/images/bookmark_fill.svg";
import MicWhiteIcon from "@/assets/images/mic_white.svg";
import {Link} from "react-router-dom";
const MyPageContainer = styled.main`
  width: 100vw;
  min-height: 100dvh;
  background: linear-gradient(180deg, #6E61CA 0%, #9671E1 69.5%, #C282FA 100%);
  padding: 22px 20px;
  * {
    color: #fff;
  }
  .prevBtn {
    position: fixed;
    top: 22px;
    left: 20px;
    padding: 0;
  }
  .logoutBtn {
    position: fixed;
    bottom: 68px;
    left: 50%;
    transform: translateX(-50%);
  }

  .contentsBox {
    margin-top: 50px;
    padding: 0 10px;
    article {
      h1 {
        font-size: 24px;
        font-weight: 400;
      }
      .editProfile {
        font-size: 14px;
        margin: 9px 0 0 4px;
      }
      &.contentsHeader {
        margin-bottom: 58px;
      }
      &.contentsList {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 18px;
        a {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 18px;
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
   
  }
`;
const MyPage = () => {
    const navigate = useNavigate();
    const handleGoBack = () => navigate(-1);
    const handleLogout = () => navigate('/logout');
    return (
        <MyPageContainer>
            <button className='prevBtn' onClick={handleGoBack}>
                <img src={PrevBtn} alt='Expend Left Button' />
            </button>
            <section className='contentsBox'>
                <article className='contentsHeader'>
                    <h1>USER NAME</h1>
                    <button className='editProfile'>프로필 수정</button>
                </article>
                <article className='contentsList'>
                    <Link to='/myPage/createContents'>
                        <img src={MicWhiteIcon} alt='createdContent' />
                        내가 만든 콘텐츠
                    </Link>
                    <Link to='/myPage/savedContents'>
                        <img src={BookmarkFillIcon} alt='bookmarkContent' />
                        저장한 콘텐츠
                    </Link>
                </article>
            </section>
            <button className='logoutBtn' onClick={handleLogout}>
                로그아웃
            </button>
        </MyPageContainer>
    );
};

export default MyPage;