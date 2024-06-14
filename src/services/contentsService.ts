import {deleteData, getData, postData, putData} from "@/api";
import {Content, FormDataType} from "@/types/contents";

export const fetchContents = async () => {
    try {
        return await getData<Content[]>('/contents');
    } catch (err) {
        throw new Error('Failed to get contents')
    }
}
export const fetchContent = async (id: string | undefined) => {
    try {
        return await getData<Content>(`/contents/${id}`);
    } catch (err) {
        throw new Error('Failed to get content')
    }
}
export const createContent = async (data: FormDataType) => {
    try {
        return await postData<FormDataType>(`/content`, data);
    } catch (err) {
        throw new Error('Failed to update content')
    }
}
export const updateContent = async (data: Content) => {
    try {
        return await putData<Content>(`/contents/${data.id}`, data);
    } catch (err) {
        throw new Error('Failed to update content')
    }
}
export const deleteContent = async (id: string) => {
    try {
        return await deleteData<string>(`/contents/${id}`);
    } catch (err) {
        throw new Error('Failed to delete content')
    }
}