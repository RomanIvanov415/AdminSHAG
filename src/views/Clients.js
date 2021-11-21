import React, {useEffect, useState, useContext} from 'react';
import { Col, Row, Table, Button, Card, CardBody, FormGroup, Label, Input } from 'reactstrap';
import {observer} from 'mobx-react-lite';
import { Context } from 'index';
import {getClients, updateClient, deleteClient} from '../http/userAPI';

function Clients() {
    const {client} = useContext(Context);

    const [showEditPanel, setShowEditPanel] = useState(false);
    const [nameInputValue, setNameInputValue] = useState('');
    const [emailInputValue, setEmailInputValue] = useState('');
    const [phoneInputValue, setPhoneInputValue] = useState('');

    const editClient = (id, name, email, phoneNumber) => {
      updateClient(id, name, email, phoneNumber).then(res => {
        client.editClient(res.id,
          {id: client.chosenClient.id,
            name: res.name,
            phoneNumber: res.phoneNumber,
            contactEmail: res.contactEmail,
            lastOrderDate: client.chosenClient.lastOrderDate
        })
      })
    }

    const removeClient = (id) => {
      deleteClient(id).then(res => {
        client.setClients(client.clients.filter(i => i.id !== id));
      })
    }

    useEffect(() => {
      getClients().then(res => {
        client.setClients(res);
        client.setChosenClient(res[0]);
      })
    }, [])

    return (
        <div className='content'>
            <Row>
                <Col lg="12" className="clients__table">
                <Table responsive>
                      <thead>
                          <tr>
                              <th className="text-center">Id</th>
                              <th>Name</th>
                              <th>Phone number</th>
                              <th className="text-center">E-mail</th>
                              <th className="text-right">Last order date </th>
                              <th className="text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                        {client.clients.map(cli => {
                          return(
                            <tr className={`clients__table-row ${client.chosenClient.id === cli.id ? 'chosen' : ''}`} key={client.id}
                            onClick={() => {client.setChosenClient(cli)}}>
                              <td className="text-center">{cli.id}</td>
                              <td>{cli.name}</td>
                              <td>{cli.phoneNumber}</td>
                              <td className="text-center">{cli.contactEmail}</td>
                              <td className="text-right">{cli.lastOrderDate}</td>
                              <td className="text-right">
                              <Button className="btn-icon btn-simple" color="success" size="sm"
                              onClick={() => {setShowEditPanel(true)}}>
                                      <i className="fa fa-edit"></i>
                                  </Button>{` `}
                                  <Button className="btn-icon btn-simple" color="danger" size="sm"
                                  onClick={() => {removeClient(cli.id)}}>
                                      <i className="fa fa-times" />
                                  </Button>{` `}
                              </td>
                          </tr>
                          )
                        })}
                          
                      </tbody>
                  </Table>
                </Col>
            </Row>
            {showEditPanel && 
            <Row>
              <Col lg="12">
              <Card>
                <CardBody>
                  <form>
                    <FormGroup>
                      <Label for="EditClientName">Name</Label>
                      <Input
                        type="text"
                        name="EditClientName"
                        id="EditClientName"
                        placeholder="Enter new name"
                        value={nameInputValue}
                        onChange={e => setNameInputValue(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="EditClientPhoneNumber">Phone number</Label>
                      <Input
                        type="text"
                        name="EditClientPhoneNumber"
                        id="EditClientPhoneNumber"
                        placeholder="Enter new phone number"
                        value={phoneInputValue}
                        onChange={e => setPhoneInputValue(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="EditClientName">E-mail</Label>
                      <Input
                        type="email"
                        name="EditClientEmail"
                        id="EditClientEmail"
                        placeholder="Enter new e-mail"
                        value={emailInputValue}
                        onChange={e => setEmailInputValue(e.target.value)}
                      />
                    </FormGroup>
                    <Button color="primary"
                    onClick={() => {editClient(client.chosenClient.id, nameInputValue, emailInputValue, phoneInputValue)}}>
                      Save
                    </Button>
                  </form>
                </CardBody>
              </Card>
              </Col>
            </Row>
            }
            
        </div>
    )
}

export default observer(Clients);