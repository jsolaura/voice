import {LatLngType} from "@/types/maps";

export interface FormDataType {
    title?: string;
    type: string;
    text?: string;
    isDisplay: boolean;
}

export interface Content extends FormDataType {
    id: number | string;
    audioFile?: string;
    createAt: Date;
    latlng: LatLngType;
}