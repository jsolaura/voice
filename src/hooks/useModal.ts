import {useRecoilState} from "recoil";
import {modalState} from "@/recoil/CommonAtom";
import {useCallback, useEffect} from "react";
import {ModalType} from "@/types/common";

export const useModal = () => {
    const [modalDataState, setModalDataState] = useRecoilState(modalState);

    const closeModal = useCallback(() => {
        setModalDataState((prev) => {
            return {...prev, isOpen: false}
        });
    }, [setModalDataState]);

    const openModal = useCallback(({ title, content, callback }: ModalType) => {
        setModalDataState({
            isOpen: true,
            title: title,
            content: content,
            callback: callback,
        })
    }, [setModalDataState]);

    useEffect(() => {
        if (modalDataState.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [modalDataState.isOpen]);

    return { modalDataState, closeModal, openModal };
}