import React from 'react';
import {useLocation, useNavigate} from "react-router";
import Loading from "@/components/common/Loading";
import {useRecoilState} from "recoil";
import {isLoggedInState} from "@/recoil/CommonAtom";


const Redirect = () => {
    const navigate = useNavigate();
    const query = useLocation().search;
    const code = new URLSearchParams(query).get('code');
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    // useEffect(() => {
    //     axiosApi
    //         .get(`/apiUrl`)
    //         .then((res) => {
    //             console.log(res.data);
    //             const token = {
    //                 access: res.data.accessToken,
    //                 refresh: res.data.refreshToken,
    //             }
    //             // if(token) setToken(token);
    //             setIsLoggedIn(true);
    //         })
    //         .then(() => {
    //             navigate('/');
    //         })
    //         .catch((err) => console.log(err));
    // }, []);
    return (
        <Loading />
    );
};

export default Redirect;