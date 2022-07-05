import React from 'react';
import { Button, Form } from 'react-bootstrap';

const LoginForm = ({handleLogin, username, password, setPassword, setUsername}) => {
    return (
        <div>
            <h3>Login</h3>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label> Username: </Form.Label>
                    <Form.Control value={username} type='text' name='Username' onChange={({target}) => setUsername(target.value)}/>
                    <Form.Label> Password: </Form.Label>
                    <Form.Control value={password} type='password' name='Password' onChange={({target}) => setPassword(target.value)}/>
                <Button type='submit'>Login</Button>
                </Form.Group>
                
            </Form>
        </div>
    );
}

export default LoginForm;
