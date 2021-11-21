import { $authHost } from './index';

export const getAll = async () => {
    const {data} = await $authHost.get('api/user');
    return data;
}

export const editOne = async (id, changes) => {
    const {data} = await $authHost.put(`api/user/${id}`, changes);
    return data;
}