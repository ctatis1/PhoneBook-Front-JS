import React, { useEffect, useState } from 'react';
import Contacts from './components/Contacts';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Toggleable from './components/Toggleable';
import contactServices from './services/contacts';
import loginServices from './services/login';

const App = () => {

    const [people, setPeople] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        contactServices
            .getAll()
            .then(initialPeople => setPeople(initialPeople));
    }, []);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedContactAppUser')
        if(loggedUser){
            const user = JSON.parse(loggedUser);
            setUser(user)
            contactServices.getToken(user.token)
        }
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {            
            const user = await loginServices.login({
               username, password
            })

            window.localStorage.setItem('loggedContactAppUser', JSON.stringify(user));

            contactServices.getToken(user.token)
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (error) {
            setMsg(`Wrong credentials`)
            setTimeout(() => {
                setMsg(null)
            }, 5000);
        }
    }

    const loggedIn = () => {
        return(
            <>
            <h2>
                {user.name} <button onClick={() => {
                    window.localStorage.removeItem('loggedContactAppUser')
                    setUser(null)
                }}>Logout</button>
            </h2>
            <Toggleable buttonLabel='New Contact'>
                <h3>Form</h3>
                <PersonForm people={people} setPeople={setPeople}/>
            </Toggleable>
            <h3>Contacts</h3>
            <Contacts contacts={people} setPeople={setPeople}/>
            </>
        );
    }

    return (
        <div>
            <h1>PhoneBook</h1>
            <Notification message={msg}/>
            {user===null?
                <LoginForm 
                    password={password} 
                    username={username} 
                    handleLogin={handleLogin}
                    setPassword={setPassword}
                    setUsername={setUsername}
                    />
                :
                loggedIn()    
            }
        </div>
    );
}

export default App;
