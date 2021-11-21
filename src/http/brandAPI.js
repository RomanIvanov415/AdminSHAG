import {$authHost} from './index';
import BrandService from '../services/brandService'

export const getAllBrands = async () => {
    const {data} = await $authHost.get('api/brand');
    return BrandService.transformBrands(data);
};

export const getOneBrand = async (id) => {
    const {data} = await $authHost.get(`api/brand/${id}`);
    const devices = (await $authHost.get(`api/device?brandId=${id}`)).data.rows;
    const deviceList = BrandService.transforsDeviceList(devices);
    deviceList.forEach(device => {
        const path = (device.image.path).slice(-40);
        device.image = path;
    })
    return {data, deviceList};
};

export const createBrand = async (name) => {
    const {data} = await $authHost.post('api/brand', {name});
    return data;
};

export const renameBrand = async (id, newName) => {
    const {data} = await $authHost.put('api/brand', {id, newName});
    return data;
};

export const deleteBrand = async (id) => {
    const {data} = await $authHost.delete(`api/brand/${id}`);
    return data;
}



