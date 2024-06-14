import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {CustomOverlayMap, Map, MapMarker, MarkerClusterer} from "react-kakao-maps-sdk";
import MarkerImage from '@/assets/images/marker.svg';
import CurrentMarkerImage from '@/assets/images/currentMarker.svg';
import {getCount, setupAddress} from "@/utils/common";
import CustomOverlay from "@/components/map/CustomOverlay";
import {DetailInfoProps} from "@/types/maps";
import useOutsideClick from "@/hooks/useOutsideClick";
import {useRecoilState} from "recoil";
import {addressState, currentPositionState} from "@/recoil/MapAtom";
import {fetchContents} from "@/services/contentsService";
import {useQuery} from "@tanstack/react-query";

let positions = [
    {
        id: 'safasdfasdfasdfasd',
        title: '카카오',
        latlng: {lat: 37.54519899908906, lng: 126.94631791119016}
    },
    {
        id: 'safasdfasdfasdfasd',
        title: '생태연못',
        latlng: {lat: 37.5365828733762, lng: 126.94093839434197}
    },
    {
        id: 'safasdfasdfasdfasd',
        title: '텃밭',
        latlng: {lat: 37.53092010700834, lng: 126.93257077576321}
    },
    {
        id: 'safasdfasdfasdfasd',
        title: '근린공원1',
        latlng: {lat: 37.533625364134, lng: 126.93664139306797}
    },
    {
        id: 'safasdfasdfasdfasd',
        title: '근린공원2',
        latlng: {lat: 37.536402491731295, lng: 126.94057647402754}
    },
    {
        id: 'safasdfasdfasdfasd',
        title: '근린공원2',
        latlng: {lat: 37.536402491731295, lng: 126.94057647402754}
    },
    {
        id: 'safasdfasdfasdfasd',
        title: '근린공원2',
        latlng: {lat: 37.536402491731295, lng: 126.94057647402754}
    },
    {
        id: 'safasdfasdfasdfasd',
        title: '근린공원2',
        latlng: {lat: 37.536402491731295, lng: 126.94057647402754}
    },
    {
        id: 'safasdfasdfasdfasd',
        title: '근린공원2',
        latlng: {lat: 37.536402491731295, lng: 126.94057647402754}
    },
    {
        id: 'safasdfasdfasdfasd',
        title: '근린공원3',
        latlng: {lat: 37.531713475444796, lng: 126.9334299062848}
    },
];

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  left: 0;
  top: 0;
`;

const useContents = () => {
    // return useQuery({ queryKey: ['contents'], queryFn: fetchContents })
}

const MapWrapper = () => {
    // const { data, status } = useQuery({
    //     queryKey: ['contents'],
    //     queryFn: fetchContents,
    // })

    const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionState);
    const [, setAddress] = useRecoilState(addressState);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [level, setLever] = useState<number>(4)
    const [detail, setDetail] = useState<DetailInfoProps>({
        id: '',
        title: '',
        latlng: currentPosition,
    })
    const mapRef = useRef<kakao.maps.Map>(null);
    const geocoder = new kakao.maps.services.Geocoder();

    const overlayRef = useOutsideClick(() => {
        setIsOpen(false);
        setDetail({
            id: '',
            title: '',
            latlng: currentPosition,
        })
    })

    const handleClusterClick = () => {
        const map = mapRef.current
        if (map !== null) {
            map.setLevel(map.getLevel() - 1);
            setLever(map.getLevel())
        }
    }

    const handleMarkerClick = (info: DetailInfoProps) => {
        setDetail(info)
        setIsOpen(true);
    }

    const handleCenterChanged = useCallback((map: kakao.maps.Map) => {
        const level = map.getLevel()
        const coords = map.getCenter()
        setLever(level)
        setCurrentPosition({ lat: coords.getLat(), lng: coords.getLng(), })
        setDetail({
            ...detail,
            latlng: {
                lat: coords.getLat(),
                lng: coords.getLng(),
            },
        })
        geocoder.coord2Address(coords.getLng(), coords.getLat(), (result, status) =>  setAddress(setupAddress(result[0].address.address_name.split(' '), status)));

    },[]);
    return (
        <>
            <MapContainer>
                <Map
                    ref={mapRef}
                    center={currentPosition}
                    level={level}
                    onCenterChanged={handleCenterChanged}
                    style={{
                        width: '100vw',
                        height: '100vh',
                        position: 'relative',
                    }}
                >
                    <MapMarker
                        position={currentPosition}
                        image={{
                            src: CurrentMarkerImage,
                            size: {
                                width: 29,
                                height: 29,
                            },
                        }}
                    />
                    <MarkerClusterer
                        averageCenter={true}
                        minLevel={4}
                        disableClickZoom={true}
                        calculator={[50]}
                        texts={getCount}
                        onClusterclick={handleClusterClick}
                        styles={[{
                            width: '50px',
                            height: '50px',
                            background: `url('${MarkerImage}') no-repeat center center / 100% 100%`,
                            textAlign: 'center',
                            lineHeight: '50px',
                            fontSize: '12px',
                        }]}
                    >
                        {positions.map((item, index) => (
                            <MapMarker
                                key={`${item.title}-${index}`}
                                title={item.title}
                                position={item.latlng}
                                onClick={() => handleMarkerClick(item)}
                                image={{
                                    src: MarkerImage,
                                    size: {
                                        width: 29,
                                        height: 29,
                                    },
                                }}
                            />
                        ))}
                    </MarkerClusterer>
                    {isOpen &&
                    <CustomOverlayMap position={detail?.latlng} zIndex={100}>
                        <div ref={overlayRef}>
                            <CustomOverlay
                                handleClose={() => setIsOpen(false)}
                                detail={detail}
                            />
                        </div>
                    </CustomOverlayMap>
                    }
                </Map>
            </MapContainer>
        </>
    );
};

export default MapWrapper;