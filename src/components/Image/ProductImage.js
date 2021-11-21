import React, {useEffect, useContext} from 'react'

import {observer} from 'mobx-react-lite';
import { Context } from 'index';

function ProductImage(props) {
    const {product} = useContext(Context);


    return (
        <div className="product-image">
            {
                !props.simple &&
                <div className="product-image__shaded"></div>
            }
            {
                !props.simple && 
                <div className="product-image__delete" onClick={() => product.deleteChosenProductImage(props.imgId)}><i className="tim-icons icon-simple-delete"></i></div>
            }
            
            
            <img src={props.src || props.path} alt=""/>
        </div>
    )
};

export default observer(ProductImage);