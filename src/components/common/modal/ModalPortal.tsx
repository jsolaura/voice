import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
}

const ModalPortal = ({ children }: PortalProps) => {
    const modalRoot = document.getElementById('modal') as HTMLElement;

    return ReactDOM.createPortal(children, modalRoot);
};

export default ModalPortal;