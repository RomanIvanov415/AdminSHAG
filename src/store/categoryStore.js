import { makeAutoObservable } from 'mobx';
export default class categoryStore{
    constructor(){
        this._categories = [];
        this._subcategories = [];
        this._deviceList = [];
        this._chosenCategory = [];
        this._chosenSubcategory =[];
        makeAutoObservable(this);
    }

    setCategories(categories){
        this._categories = categories;
    }

    setSubcategories(subcategories){
        this._subcategories = subcategories;
    }

    setDeviceList(deviceList){
        this._deviceList = deviceList;
    }

    setChosenCategory(chosenCategory){
        this._chosenCategory = chosenCategory;
    }

    setChosenSubcategory(chosenSubcategory){
        this._chosenSubcategory = chosenSubcategory;
    }

    addToCategories(category){
        this._categories.push(category);
    }

    addToSubcategories(subcategory){
        this._subcategories.push(subcategory);
    }

    updateCategory(id, newName){
        const index = this._categories.findIndex((item) => {
            return item.id === id ;
        });
        this._categories[index].name = newName;
    }

    updateSubcategory(id, newName){
        const index = this._subcategories.findIndex((item) => {
            return item.id === id ;
        });
        this._subcategories[index].name = newName;
    }

    get categories(){
        return this._categories;
    }

    get subcategories(){
        return this._subcategories;
    }

    get deviceList(){
        return this._deviceList;
    }

    get chosenCategory(){
        return this._chosenCategory;
    }

    get chosenSubcategory(){
        return this._chosenSubcategory;
    }
}