/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useContext } from "react";
// nodejs library that concatenates classes

import {observer} from 'mobx-react-lite';
import { Context } from 'index';


import {
  Table,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody

} from "reactstrap";


import {
  getAllCategories, 
  getOneCategory, 
  getAllSubcategories, 
  getOneSubcategory, 
  addCategory, 
  addSubcategory, 
  renameSubcategory, 
  renameCategory, 
  deleteCategory, 
  deleteSubcategory} from '../http/categoryAPI';



function Categories(props) {
  const {category} = useContext(Context);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(null);
  const [addInputValue, setAddInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');



  const pickSubcategory = subcat => {
    category.setChosenSubcategory(subcat);
    getOneSubcategory(subcat.id).then(res => {
      category.setDeviceList(res.deviceList);
    })
  }

  const pickCategory = cat => {
    category.setChosenCategory(cat);
    getAllSubcategories(cat.id).then(res => {
      category.setSubcategories(res);
      if(res[0]){
        pickSubcategory(res[0])
      }
      else{
        category.setDeviceList([]);
      }
    })
  }

  const showDeviceList = (from) => {
    setShowAddCategory(false)
    if(from === 'category' && isEditing === 'category'){
      setShowEditCategory(false);
      setIsEditing('');
    };
    if(from === 'subcategory' && isEditing === 'subcategory'){
      setShowEditCategory(false);
      setIsEditing('');
    };
  }

  const add = (name, what, categoryId) => {
    if(what === 'category'){
      addCategory(name).then(res => {
        category.addToCategories(res);
      })
    };
    if(what === 'subcategory') {
      addSubcategory(name, categoryId).then(res => {
        category.addToSubcategories(res);
      })
    };
  }

  const rename = (name, what, id) => {
    if(what === 'category'){
      renameCategory(id, name);
      category.updateCategory(id, name);
    };
    if(what === 'subcategory'){
      renameSubcategory(id, name);
      category.updateSubcategory(id, name);
    };
  }

  const removeCategory = id => {
    deleteCategory(id);
    category.setCategories(category.categories.filter(cat => cat.id !== id));
  }

  const removeSubcategory = id => {
    deleteSubcategory(id);
    category.setSubcategories(category.subcategories.filter(subcat => subcat.id !== id));
  }

  useEffect(() => {

    getAllCategories().then(res => {

      category.setCategories(res);
      pickCategory(res[0]);

    });

  }, [])


  
 
  
  return (
    <>
      <div className="content">
        
        <Row>
          <Col lg="3" className='category__table'>
          <Table responsive >
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th className="text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
              {category.categories.map((cat) => {
                return(
                  <tr className={`category__table-row ${category.chosenCategory.id === cat.id ? 'chosen' : ''}`} 
                  key={cat.id} 
                  onClick={() => {showDeviceList('category'); pickCategory(cat)}}>
                    <td>{cat.name}</td>
                    <td>{cat.quantity}</td>
                    <td className="text-right">
                      <Button className="btn-icon btn-simple" color="info" size="sm">
                          <i className="tim-icons icon-bullet-list-67"></i>
                      </Button>{` `}
                      <Button className="btn-icon btn-simple" color="success" size="sm"
                      onClick={() => {setIsEditing('category'); setShowEditCategory(true)}}>
                          <i className="fa fa-edit"></i>
                      </Button>{` `}
                      <Button className="btn-icon btn-simple" color="danger" size="sm"
                      onClick={() => {removeCategory(cat.id)}}>
                          <i className="fa fa-times" />
                      </Button>{` `}
                    </td>
                </tr>
                )
              })}
                
            </tbody>
            </Table>
            <Button color='info'
            onClick={()=> {setShowAddCategory(true); setIsAdding('category'); setShowEditCategory(false)}}>Add</Button>
          </Col>
          <Col lg="3" className='category__table'>
          <Table responsive >
            <thead>
                <tr>
                    <th>Subcategory</th>
                    <th>Quantity</th>
                    <th className="text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {category.subcategories.map(subcat => {
                  return(
                    <tr className={`category__table-row ${category.chosenSubcategory.id === subcat.id ? 'chosen' : ''}`}
                    key={subcat.id} 
                    onClick={() => {showDeviceList('subcategory'); pickSubcategory(subcat)}}
                    >
                    <td>{subcat.name}</td>
                    <td>{subcat.quantity}</td>
                    <td className="text-right">
                      <Button className="btn-icon btn-simple" color="info" size="sm">
                          <i className="tim-icons icon-bullet-list-67"></i>
                      </Button>{` `}
                      <Button className="btn-icon btn-simple" color="success" size="sm"
                      onClick={() => {setIsEditing('subcategory'); setShowEditCategory(true)}}>
                          <i className="fa fa-edit"></i>
                      </Button>{` `}
                      <Button className="btn-icon btn-simple" color="danger" size="sm"
                      onClick={() => {removeSubcategory(subcat.id)}}>
                          <i className="fa fa-times" />
                      </Button>{` `}
                    </td>
                </tr>
                  )
                })}
                
            </tbody>
            </Table>
            <Button color='info' 
            onClick={()=> {setShowAddCategory(true); setIsAdding('subcategory')}}
            >Add</Button>
          </Col>
          {showAddCategory && 
          <Col lg="6">
          <Card>
              <CardBody>
                <h1 className="title">Add {isAdding}</h1>
                <form>
                  <FormGroup>
                    <Label for="CategoryName">Name</Label>
                    <Input
                      type="text"
                      name="CategoryName"
                      id="CategoryName"
                      placeholder="Enter category Name"
                      value={addInputValue}
                      onChange={e => {setAddInputValue(e.target.value)}}
                    />
                  </FormGroup>
                  
                  <Button color="primary"
                  onClick={() => {
                    add(addInputValue, isAdding, category.chosenCategory.id);
                  }}
                  >
                    Add
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
          }
          {showEditCategory && 
            <Col lg="6">
            <Card>
                <CardBody>
                  <h1 className="title">Edit {isEditing}</h1>
                  <form>
                    <FormGroup>
                      <Label for="NewCategoryName">New name</Label>
                      <Input
                        type="text"
                        name="NewCategoryName"
                        id="NewCategoryName"
                        placeholder="Enter new category name"
                        value={editInputValue}
                        onChange={e => {
                          e.preventDefault()
                          setEditInputValue(e.target.value)
                        }}
                      />
                    </FormGroup>
                    <Button color="primary"
                    onClick={() => {
                      rename(editInputValue, isEditing, isEditing === 'category' ? category.chosenCategory.id : category.chosenSubcategory.id);}}>
                      Save
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Col>
          }
          
          {(!showAddCategory && !showEditCategory) && 
            <Col lg="6" className='category__product-table'>
            <Table responsive className='category__table '>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Vendor code</th>
                      <th>Image</th>
                  </tr>
              </thead>
              <tbody>
                {
                  category.deviceList.map(device => {
                    return(
                      <tr className='category__table-row' key={device.id}>
                      <td>{device.id}</td>
                      <td>{device.name}</td>
                      <td>{device.vendorCode}</td>
                      <td><img src={'http://localhost:4000/' + device.image}/></td>
                  </tr>
                    )
                  })
                }
                  
                  
              </tbody>
              </Table>
            </Col>
          }
          
        </Row>
        
      </div>
    </>
  );
}

export default observer(Categories);