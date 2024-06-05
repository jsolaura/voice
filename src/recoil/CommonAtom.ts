import {atom} from "recoil";
import {ModalType} from "@/types/common";

export const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: true,
})

export const modalState = atom<ModalType>({
    key: 'modalState',
    default: {
        isOpen: false,
        title: '',
        content: '',
    }
})