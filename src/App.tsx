import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Outlet, Routes} from "react-router-dom";
import {Route} from "react-router";
import Loading from "@/components/common/Loading";
import Modal from "@/components/common/modal/Modal";
import {useModal} from "@/hooks/useModal";

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Redirect = React.lazy(() => import('./pages/auth/Redirect'));
const ProtectedRoute = React.lazy(() => import('./routes/ProtectedRoute'));
const Detail = React.lazy(() => import('./pages/Detail'));
const Create = React.lazy(() => import('./pages/Create'));
const MyPage = React.lazy(() => import('./pages/MyPage'));

declare global {
    interface Window {
        Kakao: any;
    }
}

const SuspenseLayout = () => (
    <React.Suspense fallback={<Loading />}>
        <Outlet />
    </React.Suspense>
)

function App() {
    const { Kakao } = window;
    const { modalDataState } = useModal();
    useEffect(() => {
        Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }, [])
    console.log(Kakao)
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SuspenseLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/auth' element={<Redirect />} />
                    {/*<Route element={<ProtectedRoute />}>*/}
                        <Route path='/detail/:id' element={<Detail />} />
                        <Route path='/create' element={<Create />} />
                        <Route path='/myPage' element={<MyPage />} />
                    {/*</Route>*/}
                </Route>
            </Routes>
            {modalDataState.isOpen &&
                <Modal />
            }
        </BrowserRouter>
    );
}

export default App;
