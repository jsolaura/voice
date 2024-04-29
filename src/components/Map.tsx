import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import MarkerImage from '@/assets/images/soundwave.png';
import Detail from "@/components/Detail";
import Marker = kakao.maps.Marker;
declare global {
    interface Window {
        kakao: any;
    }
}
let positions = [
    {
        title: '카카오',
        latlng: new kakao.maps.LatLng(37.54519899908906, 126.94631791119016)
    },
    {
        title: '생태연못',
        latlng: new kakao.maps.LatLng(37.5365828733762, 126.94093839434197)
    },
    {
        title: '텃밭',
        latlng: new kakao.maps.LatLng(37.53092010700834, 126.93257077576321)
    },
    {
        title: '근린공원1',
        latlng: new kakao.maps.LatLng(37.533625364134, 126.93664139306797)
    },
    {
        title: '근린공원2',
        latlng: new kakao.maps.LatLng(37.536402491731295, 126.94057647402754)
    },
    {
        title: '근린공원3',
        latlng: new kakao.maps.LatLng(37.531713475444796, 126.9334299062848)
    },
];
const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  left: 0;
  top: 0;
`;
const Map = () => {
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [latLng, setLatLng] = useState<string>('');
    const [detail, setDetail] = useState<Marker | null>(null);

    const mapRef = useRef<HTMLElement | null>(null);
    const clickDetail = (data: any) => {
        if (data) {
            let message = `위도-${data.latlng.getLat()}, 경도-${data.latlng.getLng()}`;

            setLatLng(message);
            setOpenDetail(true);
            setDetail(data);
        }
    }

    const initMap = () => {
        let markers = [];

        // Map DOM 레퍼런스
        const container = document.getElementById('map');

        // Map Options
        const options = {
            center: new kakao.maps.LatLng(37.5338, 126.9371),
            level: 5
        };

        // Create Map
        const map = new kakao.maps.Map(container as HTMLElement, options);
        (mapRef as MutableRefObject<any>).current = map;

        // Create Clusterer
        let clusterer = new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 5,
            disableClickZoom: true,
        });

        // Check Markers and Create
        for (let i=0; i<positions.length; i++) {
            let imageSize = new kakao.maps.Size(24, 35);
            let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            let marker = new kakao.maps.Marker({
                map: map,
                position: positions[i].latlng,
                title: positions[i].title,
                image: markerImage,
            })
            markers.push(marker);
            kakao.maps.event.addListener(marker, 'click', () => {
                console.log(positions[i]);
                clickDetail(positions[i])
            });
        }

        // Add Markers to Clusterer
        clusterer.addMarkers(markers);

        kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster: any) => {
            let level = map.getLevel()-1;

            map.setLevel(level, {anchor: cluster.getCenter()});
        });

        // Map Drag Moving Control
        // map.setDraggable(false);
    }

    useEffect(() => {
        kakao.maps.load(() => initMap());
    }, [mapRef]);
    return (
        <>
            <MapContainer id='map' />
            {detail &&
                <Detail detail={detail} openDetail={openDetail} setOpenDetail={setOpenDetail} />
            }
        </>
    );
};

export default Map;