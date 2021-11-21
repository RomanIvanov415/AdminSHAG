import { makeAutoObservable } from 'mobx';

export default class orderStore{
    constructor(){
        this._orders = [];
        this._chosenOrder = [];
        this._deviceList = [];
        makeAutoObservable(this);
    }
    setOrders(orders){
        this._orders = orders;
    }

    setChosenOrder(order){
        this._chosenOrder = order;
    }

    setDeviceList(list){
        this._deviceList = list;
    }

    editOrder(id, newData){
        const index = this._orders.findIndex(i => i.id === id);
        this._orders[index] = newData;
    }

    get orders(){
        return this._orders;
    }

    get chosenOrder(){
        return this._chosenOrder;
    }

    get deviceList(){
        return this._deviceList;
    }
}