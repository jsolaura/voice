import {Dispatch, SetStateAction} from "react";

export type LocationProps = {
    title: string;
    latlng: kakao.maps.LatLng;
}

export interface DetailProps {
    openDetail: boolean;
    setOpenDetail: Dispatch<SetStateAction<boolean>>;
    location: LocationProps
}