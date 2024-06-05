import React, {useState} from 'react';
import styled from "styled-components";
import {CustomOverlayMap, Map, MapMarker, MarkerClusterer} from "react-kakao-maps-sdk";
import MarkerImage from '@/assets/images/marker.png';
import {getCount} from "@/utils/common";
import CustomOverlay from "@/components/map/CustomOverlay";
import {DetailInfoProps} from "@/types/maps";
import useOutsideClick from "@/hooks/useOutsideClick";

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

const MapWrapper = () => {
    const defaultCenter = {lat: 37.5338, lng: 126.9371};
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [level, setLever] = useState<number>(4)
    const [detail, setDetail] = useState<DetailInfoProps>({
        id: '',
        title: '',
        latlng: defaultCenter,
    })

    const clusterClick = (target: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
        if (level >= 4) setLever(level);
    }

    const handleMarkerClick = (info: DetailInfoProps) => {
        setDetail(info)
        setIsOpen(true);
    }

    const ref = useOutsideClick(() => {
        setIsOpen(false);
        setDetail({
            id: '',
            title: '',
            latlng: defaultCenter,
        })
    })
    return (
        <>
            <MapContainer>
                <Map
                    center={defaultCenter}
                    level={4}
                    style={{
                        width: '100vw',
                        height: '100vh',
                        position: 'relative',
                    }}
                >
                    <MarkerClusterer
                        averageCenter={true}
                        minLevel={4}
                        disableClickZoom={true}
                        calculator={[50]}
                        texts={getCount}
                        onClusterclick={clusterClick}
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
                        <div ref={ref}>
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