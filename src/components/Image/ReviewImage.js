import React from 'react';

export default function ReviewImage(props){
    return (
        <div className="review-image">
            <img src={props.path} alt=""/>
        </div>
    );
};