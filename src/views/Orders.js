import React, {useState, useEffect, useContext} from 'react';
import { Col, Row, Table, Button, Card, CardBody, FormGroup, Label, Input } from 'reactstrap';
import {observer} from 'mobx-react-lite';
import { Context } from 'index';
import {getOrdersData, getOneOrder, deleteOne} from '../http/orderAPI'


function Orders() {
    const {order} = useContext(Context);

    const [customerNameInputValue, setCustomerNameInputValue] = useState('');
    const [dateInputValue, setDateInputValue] = useState('');
    const [sumInputValue, setSumInputValue] = useState('');

    const pickOrder = ord => {
        getOneOrder(ord.id).then(res => {
            if(res.find === false){
                return;
            }
            order.setChosenOrder(ord);
            order.setDeviceList(res.orderDevices);
        });
    }

    const removeOrder = id => {
        deleteOne(id).then(res => {
            order.setOrders(order.orders.filter(i => i.id !== id));
            order.setChosenOrder(order.orders[0]);
        })
    }
 
    useEffect(() => {
        getOrdersData().then(res => {
            order.setOrders(res);
            pickOrder(res[0]);
        })
    }, [])

    return (
        <div className="content">
            <Row>
                <Col lg="6" responsive className="orders__table">
                    <Table responsive>
                        <thead>
                            <tr className='orders__table-row'>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Customer name 
                                </th>
                                <th>
                                    Sum
                                </th>
                                <th>
                                    Date
                                </th>
                                <th>Completed</th>
                                <th className="text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orders.map(ord => {
                                return(
                                    <tr className={`orders__table-row ${order.chosenOrder.id === ord.id ? 'chosen' : ''}`} key={ord.id}
                                    onClick={() => {pickOrder(ord)}}>
                                        <td>
                                            {ord.id}
                                        </td>
                                        <td>
                                            {ord.customerName}
                                        </td>
                                        <td>
                                            {ord.sum}&#36;
                                        </td>
                                        <td>
                                            {ord.date}
                                        </td>
                                        <td>
                                            {ord.completed}
                                        </td>
                                        <td className="text-right">
                                            <Button className="btn-icon btn-simple" color="danger" size="sm"
                                            onClick={() => {removeOrder(ord.id)}}>
                                                <i className="fa fa-times" />
                                            </Button>{` `}
                                        </td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </Table>
                </Col>
                    <Col lg="6" className='category__product-table'>
                        <Table responsive className='category__table '>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Vendor code</th>
                                    <th>Quantity</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.deviceList.map(device => {
                                    return(
                                        <tr className='category__table-row' key={device.id}>
                                            <td>{device.id}</td>
                                            <td>{device.name}</td>
                                            <td>{device.vendorCode}</td>
                                            <td>{device.quantity}</td>
                                            <td><img src={`http://localhost:4000/${device.image}`} alt=''/></td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </Table>
                    </Col>
                    
            </Row>
        </div>
    )
}

export default observer(Orders)