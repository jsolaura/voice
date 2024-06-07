import React, {useEffect, useState} from 'react';
import Header from "@/components/common/Header";
import MapWrapper from "@/components/map/MapWrapper";
import CreateButton from "@/components/common/CreateButton";
import {LatLngType} from "@/types/maps";
import {useRecoilState} from "recoil";
import {currentPositionState} from "@/recoil/MapAtom";

const Home = () => {
    const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionState);
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
    }
    return (
        <div className="App">
            <Header />
            <MapWrapper />
            <CreateButton />
        </div>
    );
};

export default Home;