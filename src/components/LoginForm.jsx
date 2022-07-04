import React from 'react';

const LoginForm = ({handleLogin, username, password, setPassword, setUsername}) => {
    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <div>
                    Username: <input value={username} type='text' name='Username' onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    Password: <input value={password} type='password' name='Password' onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
