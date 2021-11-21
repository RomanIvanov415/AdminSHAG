import {$authHost} from './index';

export const getAllReviews = async (userId = null, deviceId = null, rating = null, limit = 12, page = 1) => {
    let query = `?limit=${limit}&page=${page}`;
    let devices = [];
    let users = [];
    const params = {userId, deviceId, rating};
    for (let param in params){
        if(params[param]){
            query = `${query}&${param}=${params[param]}`;
        }
    }
    const {data} = await $authHost.get(`api/review/${query}`);
    // getting device and user name
    data.forEach(async rev => {
        if(!devices.find(d => d.id === rev.deviceId)){
                await $authHost.get(`api/device/getone/${rev.deviceId}`).then(res => {
                devices.push(res)
            });
        }
        rev.deviceName = devices.find(d => d.data.id === rev.deviceId).data.name;
        if(!users.find(u => u.id === rev.userId)){
            await $authHost.get(`api/user/getone/${rev.userId}`).then(res => {
                users.push(res);
            });

        };
        rev.userName = users.find(u => u.data.id === rev.userId).data.name;
    })
    // adding short value
    data.forEach(rev => {
        rev.shortValue = rev.value.slice(0, 175) + '...';
    });
    return data;
};

export const getOneReview = async (id) => {
    const {data} = await $authHost.get(`api/review/${id}`);
    return data;
};

export const addReview = async (title, value, rating, deviceId, images) => {
    const {data} = await $authHost.post('api/review', {title, value, rating, deviceId, images});
    return data;
};

export const deleteReview = async (id) => {
    const {data} = await $authHost.delete(`api/review/${id}`);
    return data;
};
