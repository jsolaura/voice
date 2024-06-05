import {atom} from "recoil";

interface IUser {
    name: string;
    nickname: string;
    id?: string;
}
export const UserState = atom<IUser>({
    key: 'UserState',
    default: {
        name: '',
        nickname: '',
        id: '',
    }
})