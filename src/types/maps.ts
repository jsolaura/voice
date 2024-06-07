import React from "react";
export interface LatLngType {
    lat: number;
    lng: number;
}
export type DetailInfoProps = {
    id: string;
    latlng: LatLngType;
    title: string;
}
export interface CustomOverlayProps {
    detail: DetailInfoProps
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}