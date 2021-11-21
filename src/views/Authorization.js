import React, { useState, useContext } from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import { logIn } from 'http/userAPI';
import {observer} from 'mobx-react-lite'
import { Context } from 'index';

import { routes } from '../routes';

import { Card, CardBody, Col, FormGroup, Row, Label, Input, Button } from 'reactstrap'

export default observer( function Authorization() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const {user} = useContext(Context);
    const location = useLocation();
    const history = useHistory();

    const signIn = async () => {
        try{
            const response = await logIn(email, password);
            user.setIsAuth(true);
            user.setUser(response);
            history.push(location.pathname.slice(0, 6) + routes[0].path);
        }
        catch(e){
            alert(e.response.data.message)
        }
    }
    return (
        <div className="content">
            <Row className="justify-content-center">
                <Col lg="6">
                    <Card>
                        <CardBody>
                            <form>
                                <FormGroup>
                                    <Label for="exampleEmail">Email address</Label>
                                    <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="Password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    />
                                </FormGroup>
                                
                                <Button color="primary"
                                    onClick={signIn}
                                >
                                    Submit
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
})
