import React, { useContext, useEffect, useState } from 'react';

import {observer} from 'mobx-react-lite';
import { Context } from 'index';

import { getAllBrands, getOneBrand, createBrand, renameBrand, deleteBrand} from '../http/brandAPI';

import { Col, Row, Table, Button, Card, CardBody, FormGroup, Label, Input } from 'reactstrap';

function Brands() {
    const {brand} = useContext(Context);

    const [showEditPanel, setShowEditPanel] = useState(false);
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [addInputValue, setAddInputValue] = useState('');
    const [editInputValue, setEditInputValue] = useState('');

    const pickBrand = pickedBrand => {
        brand.setChosenBrand(pickedBrand);
        getOneBrand(pickedBrand.id).then(res => {
            brand.setDeviceList(res.deviceList);
        });
    }
    const showDeviceList = (showEP, showAP) => {
        if(!showEP && !showAP){
            return;
        };
        if(showAP){
            setShowAddPanel(false);
            return;
        };
        if(showEP){
            setShowEditPanel(false);
            return;
        };
    };
    const addBrand = name => {
        createBrand(name).then(res => {
            brand.addBrand(res);
            getAllBrands().then(res => {
                brand.setBrands(res);
            })
        })
    }
    const setNameForBrand = (id, newName) => {
        renameBrand(id, newName).then(res => {
            brand.renameBrand(id, newName);
        })
    }
    const removeBrand = id => {
        deleteBrand(id).then(res => {
            brand.removeBrand(id)
        })
    }
    useEffect(() => {
        getAllBrands().then(res => {
            brand.setBrands(res);
            pickBrand(res[0]);
        })
    }, [])

    return (
        <div className='content'>
            <Row>
                <Col lg='6' className='brands__table'>
                <Table responsive>
            <thead>
                <tr>
                    <th>Brand</th>
                    <th>Quantity</th>
                    <th className="text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {brand.brands.map((br) => {
                    return(
                        <tr className={`brands__table-row ${br.id === brand.chosenBrand.id ? 'chosen' : ''}`} key={br.id} 
                        onClick={() => {pickBrand(br); showDeviceList(showEditPanel, showAddPanel)}}>
                            <td>{br.name}</td>
                            <td>{br.quantity}</td>
                            <td className="text-right">
                            <Button className="btn-icon btn-simple" color="info" size="sm">
                                <i className="tim-icons icon-bullet-list-67"></i>
                            </Button>{` `}
                            <Button className="btn-icon btn-simple" color="success" size="sm"
                            onClick={() => {setShowEditPanel(true); setShowAddPanel(false);}}>
                                <i className="fa fa-edit"></i>
                            </Button>{` `}
                            <Button className="btn-icon btn-simple" color="danger" size="sm"
                            onClick={() => {removeBrand(br.id)}}>
                                <i className="fa fa-times" />
                            </Button>{` `}
                            </td>
                        </tr>
                    )
                })} 
                
            </tbody>
            </Table>
            <Button color="info" onClick={() => {setShowEditPanel(false); setShowAddPanel(true)}}>Add</Button>
                </Col>
                {showAddPanel && 
                    <Col lg="6">
                        <Card>
                        <CardBody>
                            <h1 className="title">Add brand</h1>
                            <form>
                            <FormGroup>
                                <Label for="BrandName">Name</Label>
                                <Input
                                type="text"
                                name="BrandName"
                                id="BrandName"
                                placeholder="Enter brand name"
                                value={addInputValue}
                                onChange={e => setAddInputValue(e.target.value)}
                                />
                            </FormGroup>
                            <Button color="primary"
                            onClick={() => {addBrand(addInputValue)}}>
                                Add
                            </Button>
                            </form>
                        </CardBody>
                        </Card>
                    </Col>
                }
                {showEditPanel &&
                <Col lg="6">
                    <Card>
                    <CardBody>
                        <h1 className="title">Edit brand</h1>
                        <form>
                        <FormGroup>
                            <Label for="NewBrandName">New name</Label>
                            <Input
                            type="text"
                            name="NewBrandName"
                            id="NewBrandName"
                            placeholder="Enter brand name"
                            value={editInputValue}
                            onChange={e => {setEditInputValue(e.target.value)}}
                            />
                        </FormGroup>
                        <Button color="primary"
                        onClick={() => {setNameForBrand(brand.chosenBrand.id, editInputValue)}}>
                            Save
                        </Button>
                        </form>
                    </CardBody>
                    </Card>
                </Col>
                }
                {(!showEditPanel && !showAddPanel) && 
                <Col lg="6" className='brands__product-table brands__table'>
                    <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Vendor code</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brand.deviceList.map(device => {
                            return(
                                <tr className='brands__table-row' key={device.id}>
                                <td>{device.id}</td>
                                <td>{device.name}</td>
                                <td>{device.vendorCode}</td>
                                <td><img src={`http://localhost:4000/${device.image}`}/></td>
                            </tr>
                            )
                        })}
                        
                    </tbody>
                    </Table>
                </Col>
                }
                
            </Row>
        </div>
    )
}

export default observer(Brands);

