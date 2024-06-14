import React from 'react';
import CreateButton from "@/components/common/CreateButton";
import {useRecoilState} from "recoil";
import {isLoggedInState} from "@/recoil/CommonAtom";
import AddBtn from '@/assets/images/addBtn.svg';
import CurrentPosBtn from '@/assets/images/positionBtn.svg';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {LatLngType} from "@/types/maps";
import {currentPositionState} from "@/recoil/MapAtom";

const BottomNavContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 20px;
  z-index: 300;
  .addBtn {
    display: inline-block;
    margin: 0 auto;
  }
  .currentPos {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const BottomNav = ({ rememberPos }: {rememberPos: LatLngType}) => {
    const [isLoggedIn, ] = useRecoilState(isLoggedInState);
    const [, setCurrentPosition] = useRecoilState(currentPositionState);
    const handleSetCurrentPos = () => {
        setCurrentPosition(rememberPos);
    }
    return (
        <BottomNavContainer>
            <></>
            { isLoggedIn &&
                <Link to='/create' className='addBtn'>
                    <img src={AddBtn} alt='Create content button'/>
                </Link>
            }
            <button onClick={handleSetCurrentPos} className='currentPos'>
                <img src={CurrentPosBtn} alt='Return to current position button'/>
            </button>
        </BottomNavContainer>
    );
};

export default BottomNav;