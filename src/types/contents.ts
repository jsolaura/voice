import {LatLngType} from "@/types/maps";

export interface FormDataType {
    title?: string;
    type: string;
    text?: string;
    displayedYn: string;
    audioFile?: string | null;
}

export interface Content extends FormDataType {
    id: number | string;
    audioFile?: string;
    createAt: string;
    latlng: LatLngType;
    address?: string;
    savedYn?: string;
}