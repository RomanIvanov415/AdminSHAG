import {$host, $authHost} from './index';
import jwt_decode from 'jwt-decode';
import ClientService from '../services/clientsService'

export const logIn = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
}

export const getClients = async () => {
    const {data} = await $authHost.get('api/user?role=CLIENT');
    return ClientService.transformClients(data);
}

export const updateClient = async (id, name, contactEmail, phoneNumber) => {
    const {data} = await $authHost.put('api/user', {id, contactEmail, phoneNumber, name});
    return data;
}

export const deleteClient = async id => {
    const {data} = await $authHost.delete(`api/user/${id}`);
    return data;
}