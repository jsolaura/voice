import React from 'react';
import styled from "styled-components";
import Logo from '@/assets/images/logo.png';
import KakaoLogin from '@/assets/images/kakaoLogin.svg';
import GoogleLogin from '@/assets/images/googleLogin.svg';
import {useModal} from "@/hooks/useModal";
import {useNavigate} from "react-router";

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin: 70px auto 76px;
  }
  .noSignIn {
    text-decoration: underline;
  }
`;

const Login = () => {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();

    const { Kakao } = window;
    const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
    // const kakao_id = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const kakaoLogin = async () => {
        // const url = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_id}&redirect_uri=${redirect_uri}&response_type=code`;
        // window.open(url, "_self");
        await Kakao.Auth.authorize({
            redirectUri: `${redirect_uri}`,
            scope: 'profile_nickname,profile_image'
        })
    }

    const modalData = {
        title: '비회원으로 이용시 \n 사용에 제한이 생깁니다.',
        content: '그대로 진행하시겠습니까?',
        callback: () => {
            closeModal();
            navigate(-1);
        },
    }
    return (
        <LoginContainer>
            <img className='logo' src={Logo} alt='logo' width={259} height={259} />
            <button onClick={kakaoLogin}>
                <img src={KakaoLogin} alt='KaKao Login Button' />
            </button>
            <button>
                <img src={GoogleLogin} alt='Google Login Button' />
            </button>
            <button className='noSignIn' onClick={() => openModal(modalData)}>비회원으로 이용할게요.</button>
        </LoginContainer>
    );
};

export default Login;