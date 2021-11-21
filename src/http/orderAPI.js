import {$authHost} from './index';

export const getAllOrders = async (userId = '') => {
    const {data} = await $authHost.get(`api/order/${userId}`);
    return data;
};

export const getOrdersData = async () => {
    const {data} = await $authHost.get('api/order/data');
    return data;
}

export const getOneOrder = async (id) => {
    const {data} = await $authHost.get(`/api/order/getone/${id}`);
    return data;
};

export const addOrder = async (devices) => {
    const {data} = await $authHost.post('api/order', {devices});
    return data;
};

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete(`api/order/deleteone/${id}`);
    return data;
};

export const deleteByUserId = async (id) => {
    const {data} = await $authHost.delete(`api/order/${id}`);
    return data;
};