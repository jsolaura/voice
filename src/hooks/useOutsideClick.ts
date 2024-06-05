import {useEffect, useRef} from "react";
import {useModal} from "@/hooks/useModal";

const useOutsideClick = (callback: () => void) => {
    const { modalDataState } = useModal();
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        }
        document.addEventListener('mouseup', handleClickOutside);
        document.addEventListener('touchend', handleClickOutside);

        return () => {
            document.addEventListener('mouseup', handleClickOutside);
            document.addEventListener('touchend', handleClickOutside);
        }
    }, [callback]);

    if(modalDataState.isOpen) {
        return null;
    }
    return ref;
}
export default useOutsideClick;