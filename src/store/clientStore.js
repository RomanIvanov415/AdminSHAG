import { makeAutoObservable } from 'mobx';

export default class clientStore{
    constructor(){
        this._clients = [];
        this._chosenClient = [];
        makeAutoObservable(this);
    }
    setClients(clients){
        this._clients = clients;
    }

    setChosenClient(client){
        this._chosenClient = client;
    }

    editClient(id ,newData){
        const index = this._clients.findIndex(client => client.id === id);
        this._clients[index] = newData;
    }

    get clients(){
        return this._clients;
    }

    get chosenClient(){
        return this._chosenClient;
    }
}