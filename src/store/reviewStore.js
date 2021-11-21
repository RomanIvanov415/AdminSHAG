import { makeAutoObservable } from "mobx";

export default class reviewStore{
    constructor(){
        this._allReviews = [];
        this._selectedReviews = [];
        this._chosenReview = {};
        makeAutoObservable(this);
    }

    
    setAllReviews(reviews){
        console.log(reviews);
        this._allReviews = reviews;
        console.log(this._allReviews);
    }

    setSelectedReviews(reviews){
        this._selectedReviews = reviews;
    }

    setChosenReview(review){
        this._chosenReview = review;
    }
    get allReviews(){
        return this._allReviews;
    }

    get selectedReviews(){
        return this._selectedReviews;
    }

    get chosenReview(){
        return this._chosenReview;
    }
};