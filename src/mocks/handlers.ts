import {http, HttpResponse} from 'msw';
import {LatLngType} from "@/types/maps";
const mockData = ['test1', 'test2', 'test3'];
const tempEmail = 'temp@gmail.com';
const emailAPI = {
    sendVerificationEmail: `/auth/verification/send/${tempEmail}`,
}
const baseURL = 'http://localhost:3000/api';
export const handlers = [
    http.get(`${baseURL}/contents`, (resolver) => {
        return HttpResponse.json([
            {
                id: 'test1',
                audioFile: null,
                createAt: '2024-02-16',
                latlng: {lat: 37.54519899908906, lng: 126.94631791119016},
                title: 'test1',
                type: 'text',
                text: '여기 너무 좋아요!',
                displayedYn: 'y',
            },
            {
                id: 'test2',
                audioFile: null,
                createAt: '2024-02-16',
                latlng: {lat: 37.536402491731295, lng: 126.94057647402754},
                title: 'test2',
                type: 'text',
                text: '오늘은 ~~하는 날',
                displayedYn: 'n',
            },
        ]);
    }),
    http.get(`${baseURL}/contents/test1`, () => {
        return HttpResponse.json( {
            id: 'test1',
            audioFile: null,
            createAt: '2024-02-16',
            latlng: {lat: 37.54519899908906, lng: 126.94631791119016},
            title: 'test1',
            type: 'audio',
            text: '여기 너무 좋아요!',
            displayedYn: 'y',
            address: '서울시 공덕동',
            savedYn: 'y',
        })
    }),

]