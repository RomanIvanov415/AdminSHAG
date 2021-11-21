import {$authHost} from './index';

import CategoryService from '../services/categoryService'

// Category
export const getAllCategories = async () => {
    const {data} = await $authHost.get('api/category');
    const categories = CategoryService.transformCategories(data)
    return categories;
};

export const getOneCategory = async (id) => {
    const {data} = await $authHost.get(`api/category/getone/${id}`);
    return data;
};

export const addCategory = async (name) => {
    const {data} = await $authHost.post('api/category', {name});
    return data;
};

export const renameCategory = async (id, newName) => {
    const {data} = await $authHost.put('api/category', {id, newName});
    return data
};

export const deleteCategory = async (id) => {
    const {data} = await $authHost.delete(`api/category/${id}`);
    return data;
};

//Subcategory
export const getAllSubcategories = async (categoryId = null) => {
    const {data} = await $authHost.get('api/category/subcategory');
    const subcategories = CategoryService.transformSubcategories(data, categoryId);
    return subcategories;
};

export const getOneSubcategory = async (id) => {
    const {data} = await $authHost.get(`api/category/subcategory/${id}`);
    const devices = (await $authHost.get(`api/device?subcategoryId=${id}`)).data.rows;
    const deviceList = CategoryService.getSubcategoryDevicesData(devices);
    deviceList.forEach( device => {
        const path = (device.image.path).slice(-40);
        device.image = path;
    })
    return {data ,deviceList};
};

export const addSubcategory = async (name, categoryId) => {
    const {data} = await $authHost.post('api/category/subcategory', {name, categoryId});
    return data;
};

export const renameSubcategory = async (id, newName) => {
    const {data} = await $authHost.put('api/category/subcategory', {id, newName});
    return data;
};

export const deleteSubcategory = async (id) => {
    const {data} = await $authHost.delete(`api/category/subcategory/${id}`);
    return data;
}
