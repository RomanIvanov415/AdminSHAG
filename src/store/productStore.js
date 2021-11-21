import { makeAutoObservable } from 'mobx';
import {v4} from 'uuid';

export default class productStore{
    constructor(){
        this._products = [];
        this._chosenProduct = {
            brand: {name: ''},
            category: {name: ''},
            subcategory: {name: ''},
            images: [],
            characteristics: [],
        };
        makeAutoObservable(this);
    }

    setProducts(products){
        this._products = products;
    }

    setChosenProduct(product){
        this._chosenProduct = product;
    }

    setChosenProductBrand(data){
        this._chosenProduct.brand = data;
    }

    setChosenProductCategory(data){
        this._chosenProduct.category = data;
    }

    setChosenProductSubcategory(data){
        this._chosenProduct.subcategory = data;
    }
    
    setChosenProductCharacteristics(data){
        this._chosenProduct.characteristics = data;
    }

    addImageToChodenProduct(src, file){
        this._chosenProduct.images.push({
            id: v4(),
            path: false,
            src,
            file
        })
    }

    addCharacteristicToChosenProduct(){
        this._chosenProduct.characteristics.push({
            id: v4(),
            title: '',
            value: '',
        });
    }

    addProduct(product){
        this._chosenProduct.push(product);
    }

    editProduct(id, newData){
        const index = this._products.findIndex(i => i.id === id);
        this._products[index] = newData;
    }

    deleteChosenProductImage(id){
        this._chosenProduct.images = this._chosenProduct.images.filter(img => img.id !== id);
    }

    get products(){
        return this._products;
    }

    get chosenProduct(){
        return this._chosenProduct;
    }
}

