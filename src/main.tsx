import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RecoilRoot} from "recoil";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {worker} from "@/mocks/browser";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

async function enableMocking() {
    if (import.meta.env.NODE_ENV !== 'development') {
        return;
    }
    if (typeof  window === 'undefined') {
        const { server } = await import('./mocks/server');
        return server.listen();

    } else  {
        const { worker } = await import('./mocks/browser');
        return worker.start();
    }
}
enableMocking().then(() => {
    root.render(
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen />
            </QueryClientProvider>
        </RecoilRoot>
    );
})
async function prepare() {
    if (import.meta.env.NODE_ENV === 'development') {
        const { worker } = await import('./mocks/browser');
        return worker.start();
    }
}