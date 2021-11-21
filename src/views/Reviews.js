import React, {useEffect, useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from 'index';
import { getAllReviews, getOneReview } from '../http/reviewAPI'

import {
    FormGroup,
    Input,
    Card,
    CardBody,
    Row,
    Col,
  } from "reactstrap";
  import ProductImage from 'components/Image/ProductImage';
  import ReviewImage from 'components/Image/ReviewImage';

function Reviews() {
    const {review} = useContext(Context);

    const [searchInputValue, setSearchInputValue] = useState('');

    const search = value => {

    }

    useEffect(() => {
        getAllReviews().then(res => {
            review.setAllReviews(res);
        })
    }, [])
    return (
        <div className="content">
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <form>
                                <FormGroup>
                                    <Input
                                    type="text"
                                    name="reviews-search"
                                    id="reviews-search"
                                    placeholder="Search"
                                    value={searchInputValue}
                                    onChange={e => search(e.target.value)}
                                    />
                                </FormGroup>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                {review.allReviews.map(rev => {
                    return(
                        <Col lg="4" key={rev.id}>
                            <Card>
                                <CardBody>
                                    <h2 className="title">{rev.title}</h2>
                                    <p >{rev.userName}</p>
                                    <Row className="reviews__card-subtitles">
                                    <p >{rev.deviceName}</p>
                                    <div className="reviews__stars"><i className="tim-icons icon-shape-star"></i>{rev.rating}/5</div>
                                    </Row>
                                    
                                    <Row>
                                        <Col lg="8">
                                            {rev.shortValue}
                                        </Col>
                                        <Col lg="4"> 
                                            <ProductImage simple={true} path="https://3dnews.ru/assets/external/illustrations/2014/02/13/803780/8.png"/>
                                            
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })}
                
            </Row>
            {(review.chosenReview.title) && 
                <Row>
                    <Col lg="12">
                        <Card>
                            <CardBody>
                                <h2 className="title">Title</h2>
                                <Row className="reviews__subtitles">
                                <p >Client name</p>
                                <p >Product</p>
                                <div className="reviews__stars"><i className="tim-icons icon-shape-star"></i>5/5</div>
                                </Row>
                                Спасибо большое, это ты - герой, что сделал такой урок!
    И главное, все очень сжато, но где стоит отметить какую-то деталь - ничего не упускаешь
    Я сам в разработе второй год, но в этом уроке знаний дано больше, чем набрал за все время)
    Еще раз спасибо!
    Если бы ты где-то на udemy переделал этот курс: дробить на мелкие уроки плюс исходник в результате каждого урока -- я бы заплатил за это однозначно!
    Спасибо большое, это ты - герой, что сделал такой урок!
    И главное, все очень сжато, но где стоит отметить какую-то деталь - ничего не упускаешь
    Я сам в разработе второй год, но в этом уроке знаний дано больше, чем набрал за все время)
    Еще раз спасибо!
    Если бы ты где-то на udemy переделал этот курс: дробить на мелкие уроки плюс исходник в результате каждого урока -- я бы заплатил за это однозначно!
    Спасибо большое, это ты - герой, что сделал такой урок!
    И главное, все очень сжато, но где стоит отметить какую-то деталь - ничего не упускаешь
    Я сам в разработе второй год, но в этом уроке знаний дано больше, чем набрал за все время)
    Еще раз спасибо!
    Если бы ты где-то на udemy переделал этот курс: дробить на мелкие уроки плюс исходник в результате каждого урока -- я бы заплатил за это однозначно!
                                <Row>
                                <ReviewImage path="https://3dnews.ru/assets/external/illustrations/2014/02/13/803780/8.png"/>
                                <ReviewImage path="https://3dnews.ru/assets/external/illustrations/2014/02/13/803780/8.png"/>
                                <ReviewImage path="https://3dnews.ru/assets/external/illustrations/2014/02/13/803780/8.png"/>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            }
            
        </div>
    )
};

export default observer(Reviews);
