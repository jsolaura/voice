import {deleteData, getData, postData, putData} from "@/api";
import {LatLngType} from "@/types/maps";
import {Content, FormDataType} from "@/types/contents";

export const fetchContents = async () => {
    try {
        const response = await getData<Content[]>('/contents');
        console.log(response);
        return response.result;
    } catch (err) {
        throw new Error('Failed to get contents')
    }
}
export const fetchContent = async (id: string) => {
    try {
        const response = await getData<Content>(`/contents/${id}`);
        console.log(response);
        return response.result;
    } catch (err) {
        throw new Error('Failed to get content')
    }
}
export const createContent = async (data: FormDataType) => {
    try {
        const response = await postData<FormDataType>(`/content`, data);
        console.log(response);
        return response.result;
    } catch (err) {
        throw new Error('Failed to update content')
    }
}
export const updateContent = async (data: Content) => {
    try {
        const response = await putData<Content>(`/contents/${data.id}`, data);
        console.log(response);
        return response.result;
    } catch (err) {
        throw new Error('Failed to update content')
    }
}
export const deleteContent = async (id: string) => {
    try {
        const response = await deleteData<string>(`/contents/${id}`);
        console.log(response);
        return response.result;
    } catch (err) {
        throw new Error('Failed to delete content')
    }
}