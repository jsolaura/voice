import React from 'react';
import styled from "styled-components";
import Logo from '@/assets/images/logo.png';
import KakaoLoginImage from '@/assets/images/kakaoLogin.svg';
import GoogleLoginImage from '@/assets/images/googleLogin.svg';
import {useModal} from "@/hooks/useModal";
import {useNavigate} from "react-router";
import {GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google';

const LoginContainer = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin: 70px auto 76px;
  }
  .noSignIn {
    text-decoration: underline;
  }
  button {
    width: 300px;
    img {
      width: 100%;
    }
  }
`;
const GoogleLoginBtn = () => {
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse),
        onError: errorResponse => console.log(errorResponse),
    })
    return (
        <button onClick={() => handleGoogleLogin()}>
            <img src={GoogleLoginImage} alt='Google Login Button' />
        </button>
    )
}

const Login = () => {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();

    const { Kakao } = window;
    const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
    const googleOAuthClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    // const kakao_id = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const handleKakaoLogin = async () => {
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
            <button onClick={handleKakaoLogin}>
                <img src={KakaoLoginImage} alt='KaKao Login Button' />
            </button>
            <GoogleOAuthProvider clientId={googleOAuthClientId}>
               <GoogleLoginBtn />
            </GoogleOAuthProvider>
            <button className='noSignIn' onClick={() => openModal(modalData)}>비회원으로 이용할게요.</button>
        </LoginContainer>
    );
};

export default Login;