import React, {useState, useContext, useEffect} from 'react';

import { Col, Row, Table, Button, Card, CardBody, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProductImage from 'components/Image/ProductImage';
import {observer} from 'mobx-react-lite';
import { Context } from 'index';
import {getAllProducts, updateProduct} from '../http/productsAPI';
import {getAllBrands} from '../http/brandAPI';
import {getAllCategories, getAllSubcategories} from '../http/categoryAPI';
import ProductService from 'services/productService';

function Products() {
    const {product, brand, category} = useContext(Context);

    const [showEditPanel, setShowEditPanel] = useState(true);
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [nameInputValue, setNameInputValue] = useState('');
    const [vendorCodeInputValue, setVendorCodeInputValue] = useState('');
    const [quantityInputValue, setQuantityInputValue] = useState('');
    const [priceInputValue, setPriceInputValue] = useState('');
    const [descriptionInputValue, setDescriptionInputValue] = useState('');
    const [shortDescriptionInputValue, setShortDescriptionInputValue] = useState('');
    const [characteristicsValue, setCharacteristicsValue] = useState([]);

    const pickProduct = prod => {
        product.setChosenProduct(prod);
        setNameInputValue(prod.name);
        setVendorCodeInputValue(prod.vendorCode);
        setQuantityInputValue(prod.quantity);
        setPriceInputValue(prod.price);
        setDescriptionInputValue(prod.description);
        setShortDescriptionInputValue(prod.shortDescription);
        setCharacteristicsValue(prod.characteristics);
    }

    const addImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            product.addImageToChodenProduct(reader.result, file);
        }
    }

    const editCharacteristicTitle = (prev, id, title) => {
        const newChars = prev;
        const index = newChars.findIndex(char => char.id === id);
        newChars[index].title = title;
        product.setChosenProductCharacteristics(newChars);
        console.log(newChars);
        return newChars;
    }

    const editCharacteristicValue = (prev, id, value) => {
        const newChars = prev;
        const index = newChars.findIndex(char => char.id === id);
        newChars[index].value = value;
        product.setChosenProductCharacteristics(newChars);
        console.log(newChars);
        return newChars;
    }
    const addCharacteristic = () => {
        product.addCharacteristicToChosenProduct();
        setCharacteristicsValue(product.characteristics);
    }

    const deleteCharacteristic = id => {
        product.setChosenProductCharacteristics(product.chosenProduct.characteristics.filter(char => char.id !== id));
        setCharacteristicsValue(product.chosenProduct.characteristics);
    }

    const editProduct = () => {
        const request = new FormData();
        const {oldImages, newImages} = ProductService.getImages(product.chosenProduct.images)

        request.append('name', nameInputValue);
        request.append('vendorCode', vendorCodeInputValue);
        request.append('quantity', quantityInputValue);
        request.append('description', descriptionInputValue);
        request.append('shortDescription', shortDescriptionInputValue);
        request.append('price', priceInputValue);
        request.append('characteristics',JSON.stringify(characteristicsValue));
        request.append('brandId', product.chosenProduct.brand.id);
        request.append('categoryId', product.chosenProduct.category.id);
        request.append('subcategoryId', product.chosenProduct.subcategory.id);
        request.append('oldImages', JSON.stringify(oldImages));
        newImages.forEach(img => {
            request.append('newImages', img.file, `${img.id}.jpg`);
        });
        updateProduct(product.chosenProduct.id, request).then(res => {
            // getAllProducts(null, null, null, null, null, brand.brands, category.categories, category.subcategories).then(res => {
            //     product.setProducts(res);
            //     pickProduct(res[0]);
            // })
            console.log(res);
        });
    }

    useEffect(() => {
        getAllBrands().then(res => {
            brand.setBrands(res);
            getAllCategories().then(res => {
                category.setCategories(res);
                getAllSubcategories().then(res => {
                    category.setSubcategories(res);
                    getAllProducts(null, null, null, null, null, brand.brands, category.categories, category.subcategories).then(res => {
                        product.setProducts(res);
                        pickProduct(res[0])
                    })
                })
            })
        })
        
    }, []);

    return (
        <div className="content">
            <Row>
                <Col lg="12" className="products__table">
                    <Table responsive>
                        <thead>
                            <tr>
                                <td>
                                    ID
                                </td>
                                <td>
                                    Name
                                </td>
                                <td>
                                    Vendor code
                                </td>
                                <td>
                                    Brand
                                </td>
                                <td>
                                    Category
                                </td>
                                <td>
                                    Subcategory
                                </td>
                                <td>
                                    Rating
                                </td>
                                <td>
                                    Quantity
                                </td>
                                <td className="text-right">
                                    Actions
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {product.products.map(prod => {
                                return(
                                    <tr className={`products__table-row ${prod.id === product.chosenProduct.id ? 'chosen' : ''}`} key={prod.id}
                                    onClick={() => {pickProduct(prod)}}
                                    >
                                        <td>
                                            {prod.id}
                                        </td>
                                        <td>
                                            {prod.name}
                                        </td>
                                        <td>
                                            {prod.vendorCode}
                                        </td>
                                        <td>
                                            {prod.brand.name}
                                        </td>
                                        <td>
                                            {prod.category.name}
                                        </td>
                                        <td>
                                            {prod.subcategory.name}
                                        </td>
                                        <td>
                                            {prod.overallRating}
                                        </td>
                                        <td>
                                            {prod.quantity}
                                        </td>
                                        <td className="text-right">
                                            <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                <i className="fa fa-times" />
                                            </Button>{` `}
                                        </td>
                                    </tr>
                                );
                            })}
                            
                        </tbody>
                    </Table>
                    <Button color="info">Add</Button>
                </Col>
            </Row>
            {showEditPanel && 
                <Row>
                <Col lg="12">
                    <Card className="products__edit-product">
                    <CardBody>
                        <h1 className='title'>Edit a product</h1>
                        <form>
                            <Row>
                                <Col lg="3">
                                    <FormGroup>
                                        <Label for="EditProductName">Name</Label>
                                        <Input
                                        type="text"
                                        name="EditProductName"
                                        id="EditProductName"
                                        placeholder="Enter new product name"
                                        value={nameInputValue}
                                        onChange={e => setNameInputValue(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <Label for="EditProductVendorCode">Vendor code</Label>
                                        <Input
                                        type="text"
                                        name="EditProductVendorCode"
                                        id="EditProductVendorCode"
                                        placeholder="Enter new vendor code"
                                        value={vendorCodeInputValue}
                                        onChange={e => setVendorCodeInputValue(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col lg="3">
                                    <FormGroup>
                                        <Label for="EditProductVendorCode">Quantity</Label>
                                        <Input
                                        type="text"
                                        name="EditProductVendorCode"
                                        id="EditProductVendorCode"
                                        placeholder="Enter new vendor code"
                                        value={quantityInputValue}
                                        onChange={e => setQuantityInputValue(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <Label for="EditProductVendorCode">Price</Label>
                                        <Input
                                        type="text"
                                        name="EditProductVendorCode"
                                        id="EditProductVendorCode"
                                        placeholder="Enter new vendor code"
                                        value={`${priceInputValue}`}
                                        onChange={e => setPriceInputValue(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                
                                <Col lg="4">
                                    <UncontrolledDropdown className="products__dropdown">
                                        <DropdownToggle caret data-toggle="dropdown" color="info">
                                            {product.chosenProduct.brand.name}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {brand.brands.map(br => {
                                                return(
                                                    <DropdownItem key={br.id}
                                                    onClick={() => product.setChosenProductBrand(br)}
                                                    >{br.name}</DropdownItem>
                                                )
                                            })}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Col>
                                <Col lg="4">
                                    <UncontrolledDropdown className="products__dropdown">
                                        <DropdownToggle caret data-toggle="dropdown" color="info">
                                            {product.chosenProduct.category.name}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {category.categories.map(cat => {
                                                return(
                                                    <DropdownItem key={cat.id}
                                                    onClick={() => product.setChosenProductCategory(cat)}
                                                    >{cat.name}</DropdownItem>
                                                )
                                            })}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Col>
                                <Col lg="4">
                                    <UncontrolledDropdown className="products__dropdown">
                                        <DropdownToggle caret data-toggle="dropdown" color="info">
                                            {product.chosenProduct.subcategory.name}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {category.subcategories.map(subcat => {
                                                return(
                                                    <DropdownItem key={subcat.id}
                                                    onClick={() => product.setChosenProductSubcategory(subcat)}
                                                    >{subcat.name}</DropdownItem>
                                                )
                                            })}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup className="products__textarea">
                                        <Label for="EditProductVendorCode">Description</Label>
                                        <textarea
                                        value={descriptionInputValue}
                                        onChange={e => setDescriptionInputValue(e.target.value)}
                                        ></textarea>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup className="products__textarea">
                                        <Label for="EditProductVendorCode">Short description</Label>
                                        <textarea
                                        value={shortDescriptionInputValue}
                                        onChange={e => setShortDescriptionInputValue(e.target.value)}
                                        ></textarea>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <Row>
                                        {product.chosenProduct.images.map(img => {
                                            return(
                                                <ProductImage key={img.id} path={`http://localhost:4000/${img.path}`} src={img.src} imgId={img.id}/>
                                            )
                                        })}
                                    
                                    
                                    <FormGroup className="products__add-image-button">
                                        <Label for="EditProductImage"><i className="tim-icons icon-simple-add"></i></Label>
                                        <Input
                                        type="file"
                                        name="EditProductImage"
                                        id="EditProductImage"
                                        placeholder="Enter new subcategory"
                                        onChange={e =>  addImage(e)}
                                        accept=".jpg, .jpeg, .png"
                                        />
                                    </FormGroup>
                                    </Row>
                                    
                                </Col>
                            </Row>
                            <Row className="products__characteristic-table">
                                <Col lg="12">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Value</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.chosenProduct.characteristics.map(char => {
                                                return(
                                                    <tr key={char.id}>
                                                        <td>
                                                            <FormGroup>
                                                                <Input
                                                                type="text"
                                                                name="CharacteristicNameInput"
                                                                id="CharacteristicNameInput"
                                                                placeholder="Enter characteristic name"
                                                                value={char.title}
                                                                onChange={e => {setCharacteristicsValue(prev => editCharacteristicTitle(prev, char.id, e.target.value))}}
                                                                />
                                                            </FormGroup>
                                                            </td>
                                                            <td>
                                                                <FormGroup>
                                                                    <Input
                                                                    type="text"
                                                                    name="CharacteristicValueInput"
                                                                    id="CharacteristicValueInput"
                                                                    placeholder="Enter characteristic value"
                                                                    value={char.value}
                                                                    onChange={e => {setCharacteristicsValue(prev => editCharacteristicValue(prev, char.id, e.target.value))}}
                                                                    />
                                                                </FormGroup>
                                                        </td>
                                                        <td>
                                                            <Button className="btn-icon btn-simple products__delete-characteristic-button" color="danger" size="sm"
                                                            onClick={() => deleteCharacteristic(char.id)}>
                                                                <i className="fa fa-times" />
                                                            </Button>{` `}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            
                                        </tbody>
                                        <Button color="info" onClick={() => addCharacteristic()}>Add characteristic</Button>
                                    </Table>
                                </Col>
                            </Row>
                            <Button color="primary" onClick={() => editProduct()}>
                                Save
                            </Button>
                        </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            }
            {showAddPanel && 
            <Row>
                <Col lg="12">
                    <Card className="products__add-product">
                        <CardBody>
                        <h1 className='title'>Add a product</h1>
                        <form>
                            <Row>
                                <Col lg="3">
                                    <FormGroup>
                                        <Label for="EditProductName">Name</Label>
                                        <Input
                                        type="text"
                                        name="EditProductName"
                                        id="EditProductName"
                                        placeholder="Enter new product name"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <Label for="EditProductVendorCode">Vendor code</Label>
                                        <Input
                                        type="text"
                                        name="EditProductVendorCode"
                                        id="EditProductVendorCode"
                                        placeholder="Enter new vendor code"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <Label for="EditProductVendorCode">Quantity</Label>
                                        <Input
                                        type="text"
                                        name="EditProductVendorCode"
                                        id="EditProductVendorCode"
                                        placeholder="Enter new vendor code"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <Label for="EditProductVendorCode">Price</Label>
                                        <Input
                                        type="text"
                                        name="EditProductVendorCode"
                                        id="EditProductVendorCode"
                                        placeholder="Enter new vendor code"
                                        />
                                    </FormGroup>
                                </Col>
                                
                                <Col lg="4">
                                    <UncontrolledDropdown className="products__dropdown">
                                        <DropdownToggle caret data-toggle="dropdown" color="info">
                                            Brand
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Action</DropdownItem>
                                            <DropdownItem>Another Action</DropdownItem>
                                            <DropdownItem>Something else here</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Col>
                                <Col lg="4">
                                    <UncontrolledDropdown className="products__dropdown">
                                        <DropdownToggle caret data-toggle="dropdown" color="info">
                                            Category
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Action</DropdownItem>
                                            <DropdownItem>Another Action</DropdownItem>
                                            <DropdownItem>Something else here</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Col>
                                <Col lg="4">
                                    <UncontrolledDropdown className="products__dropdown">
                                        <DropdownToggle caret data-toggle="dropdown" color="info">
                                            Subcategory
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Action</DropdownItem>
                                            <DropdownItem>Another Action</DropdownItem>
                                            <DropdownItem>Something else here</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup className="products__textarea">
                                        <Label for="EditProductVendorCode">Description</Label>
                                        <textarea></textarea>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup className="products__textarea">
                                        <Label for="EditProductVendorCode">Short description</Label>
                                        <textarea></textarea>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup className="products__add-image-button">
                                        <Label for="EditProductImage"><i className="tim-icons icon-simple-add"></i></Label>
                                        <Input
                                        type="file"
                                        name="EditProductImage"
                                        id="EditProductImage"
                                        placeholder="Enter new subcategory"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="products__characteristic-table">
                                <Col lg="12">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                <FormGroup>
                                                    <Input
                                                    type="text"
                                                    name="CharacteristicNameInput"
                                                    id="CharacteristicNameInput"
                                                    placeholder="Enter characteristic name"
                                                    />
                                                </FormGroup>
                                                </td>
                                                <td>
                                                    <FormGroup>
                                                        <Input
                                                        type="text"
                                                        name="CharacteristicValueInput"
                                                        id="CharacteristicValueInput"
                                                        placeholder="Enter characteristic value"
                                                        />
                                                    </FormGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button color="info">Add characteristic</Button>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit">
                                Save
                            </Button>
                        </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            }
            
        </div>
    );
};

export default observer(Products);