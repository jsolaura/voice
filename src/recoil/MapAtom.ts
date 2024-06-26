import {atom} from "recoil";
import {LatLngType} from "@/types/maps";

export const currentPositionState = atom<LatLngType>({
    key: 'currentPositionState',
    default: {
        lat: 0,
        lng: 0,
    }
})
export const addressState = atom<string>({
    key: 'addressState',
    default: '',
})