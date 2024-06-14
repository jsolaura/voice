
export type APIResponse<T> = {
    statusCode: number;
    errorCode: nuber;
    message: string;
    result: T;
    timestamp: Date;
}

export type ModalType = {
    isOpen?: boolean;
    title: string;
    content: JSX.Element | string;
    callback?: () => any;
}