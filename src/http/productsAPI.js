import {$authHost} from './index';
import ProductService from 'services/productService';

export const getAllProducts = async (brandId = null, categoryId = null, subcategoryId = null, limit = null, page = null, brandList = null, categoryList = null, subcategoryList = null) => {
    let query = '';
    const params = [brandId, categoryId, subcategoryId, limit, page];
    let count = 0;
    params.forEach(param => {
        if(param){
            query = `${query}${!count ? '' : '&'}${param}=${params[param]}`;
            count++;
        }
    }
       
    )
    const {data} = await $authHost.get(`api/device?${query}`);
    const brands = await $authHost.get('api/brand');
    const products = ProductService.transformProducts(data, brandList, categoryList, subcategoryList);
    return products;
};

export const getOneProduct = async (id) => {
    const {data} = $authHost.get(`api/device/getone/${id}`);
    return data;
};

export const addProduct = async (name, vendorCode, description, shortDescription, brandId, categoryId ,subcategoryId, images, characteristics = null ) => {
    const {data} = $authHost.post('api/device', {name, vendorCode, description, shortDescription, brandId, categoryId ,subcategoryId, images, characteristics});
    return data;
};

export const updateProduct = async (id, formdata) => {
    const changes = formdata;
    const data = await $authHost.put(`api/device/${id}`, changes);
    return data;
}

export const deleteProduct = async (id) => {
    const data = await $authHost.delete(`'api/device/${id}`);
    return data;
};