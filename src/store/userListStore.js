import {makeAutoObservable} from 'mobx';
export default class{
    constructor(){
        this._users = [];
        this._chosenUser = {};
        makeAutoObservable(this);
    }
    setUsers(usrs){
        this._users = usrs;
    }
    setChosenUser(user){
        this._chosenUser = user;
    }
    editUser(options = {}){
        this._chosenUser.name = options.name;
        this._chosenUser.role = options.role;
        this._users[this._users.findIndex(user => user.id === this._chosenUser.id)].name = options.name;
        this._users[this._users.findIndex(user => user.id === this._chosenUser.id)].role = options.role;
    }
    removeUser(user){
        this._users = this._users.filter(usr => usr.id !== user.id);
    }

    get users(){
        return this._users;
    }

    get chosenUser(){
        return this._chosenUser;
    }
}