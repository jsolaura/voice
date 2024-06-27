import React, {useState} from 'react';
import MyPageBtn from '@/assets/images/myPageBtn.svg';
import LogoutBtn from '@/assets/images/logoutBtn.svg';
import styled from "styled-components";
import {Box, SwipeableDrawer} from "@mui/material";
import {Link} from "react-router-dom";
import {useModal} from "@/hooks/useModal";

const SideNavContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 200;
  .MuiDrawer-paperAnchorRight {
    width: 178px;
  }
`;

const SideNav = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    const { openModal, closeModal } = useModal();
    const modalData = {
        title: '로그아웃 하시겠습니까?',
        content: '',
        callback: () => {
            // logout function
            closeModal();
        },
        background: true,
        reverse: true,
    }
    return (
        <SideNavContainer>
            <button onClick={() => setToggle(true)}>
                <img src={MyPageBtn} alt='Menu bar' />
            </button>
            <SwipeableDrawer
                className='sideDrawer'
                anchor='right'
                open={toggle}
                onClose={() => setToggle(false)}
                onOpen={() => setToggle(true)}
            >
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Link to='/myPage' style={{ height: '85px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#3F3F3F' }}>마이페이지</Link>
                    <button onClick={() => openModal(modalData)}>
                        <img src={LogoutBtn} alt='Logout button'/>
                    </button>
                </div>
            </SwipeableDrawer>
        </SideNavContainer>
    );
};

export default SideNav;