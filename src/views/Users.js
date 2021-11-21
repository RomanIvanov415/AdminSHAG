import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { Context } from 'index';

import {getAll, editOne} from '../http/userListAPI'

import { Col, Row, Table, Button, Card, CardBody, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

function Users() {
    const {userList} = useContext(Context);
    console.log(userList);
    const [nameInputValue, setNameInputValue] = useState('');
    const [roleInputValue, setRoleInputValue] = useState('');

    const sendChanges = () => {
        editOne(userList.chosenUser.id, {name: nameInputValue, role: roleInputValue}).then(res => {
            userList.editUser({name: nameInputValue, role: roleInputValue});
            userList.setChosenUser(userList.users.find(usr => usr.id === userList.chosenUser.id));
        });
    };

    useEffect(() => {
        getAll().then(res => {
            userList.setUsers(res);
            userList.setChosenUser(res[0]);
            setRoleInputValue(res[0].role)
        })
    }, [])

    return (
        <div className="content">
            <Row>
                <Col lg="12" className="users__table">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Role
                            </th>
                            <th className="text-right">
                                Acions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.users ?  userList.users.map(usr => {
                            return(
                            <tr className={`users__table-row ${userList.chosenUser.id === usr.id ? 'chosen' : ''}`}
                            onClick={() => {userList.setChosenUser(usr); setRoleInputValue(usr.role)}}>
                                <td>
                                    {usr.id}
                                </td>
                                <td>
                                    {usr.name}
                                </td>
                                <td>
                                    {usr.role}
                                </td>
                                <td className="text-right">
                                        <Button className="btn-icon btn-simple" color="success" size="sm">
                                            <i className="fa fa-edit"></i>
                                        </Button>{` `}
                                </td>
                            </tr>
                            )
                        }) :
                        <tr></tr>
                        }
                        
                    </tbody>
                </Table>
                </Col>
                <Col lg="6">
                    <Card>
                    <CardBody>
                        <h1 className="title">Edit user</h1>
                        <form>
                        <FormGroup>
                            <p className="h5">Name</p>
                            <Input
                            type="text"
                            name="NewUserName"
                            id="NewUserName"
                            placeholder="Enter new user name"
                            value={nameInputValue}
                            onChange={e => setNameInputValue(e.target.value)}
                            />
                        </FormGroup>
                        <p className="h5">Role</p>
                        <UncontrolledDropdown className="users__dropdown">
                            <DropdownToggle caret data-toggle="dropdown" color="info">
                                {roleInputValue || userList.chosenUser.role}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {setRoleInputValue('CLIENT')}}>CLIENT</DropdownItem>
                                <DropdownItem onClick={() => {setRoleInputValue('ADMIN')}}>ADMIN</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        
                        <Button color="primary" type="submit"
                        onClick={e => {e.preventDefault(); sendChanges()}}>
                            Save
                        </Button>
                        </form>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
            
        </div>
    )
};

export default observer(Users);
