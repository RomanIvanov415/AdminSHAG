import { makeAutoObservable } from 'mobx';

export default class brandStore {
    constructor(){
        this._brands = [];
        this._chosenBrand = [];
        this._deviceList = [];
        makeAutoObservable(this);
    }

    setBrands(brands){
        this._brands = brands;
    }

    addBrand(brand){
        this._brands.push(brand);
    }

    renameBrand(id, newName){
        const index = this._brands.findIndex(brand => brand.id === id);
        this._brands[index].name = newName;
    }

    removeBrand(id){
        this._brands = this._brands.filter(brand => brand.id !== id);
    }
    
    setChosenBrand(brand){
        this._chosenBrand = brand;
    }

    setDeviceList(list){
        this._deviceList = list;
    } 

    get brands(){
        return this._brands;
    }

    get chosenBrand(){
        return this._chosenBrand;
    }

    get deviceList(){
        return this._deviceList;
    }
}