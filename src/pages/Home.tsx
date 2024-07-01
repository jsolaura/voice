import React, {useEffect, useState} from 'react';
import Header from "@/components/common/Header";
import MapWrapper from "@/components/map/MapWrapper";
import {useRecoilState} from "recoil";
import {addressState, currentPositionState} from "@/recoil/MapAtom";
import {isLoggedInState} from "@/recoil/CommonAtom";
import {setupAddress} from "@/utils/common";
import SideNav from "@/components/common/SideNav";
import BottomNav from "@/components/common/BottomNav";
import {LatLngType} from "@/types/maps";

const Home = () => {
    const [isLoggedIn, ] = useRecoilState(isLoggedInState);
    const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionState);
    const [, setAddress] = useRecoilState(addressState);
    const geocoder = new kakao.maps.services.Geocoder();
    const [rememberPos, setRememberPos] = useState<LatLngType>({lat: 0 , lng: 0});
    useEffect(() => {
        if(currentPosition.lng === 0 && currentPosition.lat === 0) {
            getCurrentPosition();
        }
    }, [])
    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(getPositionSuccess, () => alert('위치 정보를 가져오는데 실패했습니다.'))
    }
    const getPositionSuccess = (pos: GeolocationPosition) => {
        setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setRememberPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        geocoder.coord2Address(pos.coords.longitude, pos.coords.latitude, (result, status) => {
            if (result.length > 0) {
                setAddress(setupAddress(result[0].address.address_name.split(' '), status))
            }
        });
    }
    return (
        <div className="App">
            { isLoggedIn && <SideNav /> }
            <Header />
            <MapWrapper />
            <BottomNav rememberPos={rememberPos} />
        </div>
    );
};

export default Home;