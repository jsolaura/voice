import React from "react";

export type DetailInfoProps = {
    id: string;
    latlng: {lat: number, lng: number};
    title: string;
}
export interface CustomOverlayProps {
    detail: DetailInfoProps
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}