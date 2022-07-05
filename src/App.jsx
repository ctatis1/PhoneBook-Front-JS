import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import contactServices from './services/contacts';
import loginServices from './services/login';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import Phonebook from './pages/Phonebook';
import Contact from './pages/Contact';
import { Button, Alert } from 'react-bootstrap';
import NavBar from './components/NavBar';

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
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {            
            const user = await loginServices.login({
               username, password
            })

            window.localStorage.setItem('loggedContactAppUser', JSON.stringify(user));

            contactServices.getToken(user.token)
            setUser(user);
            setMsg(`Welcome ${user.username}`)
            setUsername('');
            setPassword('');
            setTimeout(() => {
                setMsg(null)
            }, 3000);
        } catch (error) {
            setMsg(`Wrong credentials`)
            setTimeout(() => {
                setMsg(null)
            }, 3000);
        }
    }

    return (
            <Router>
                <NavBar user={user}/>
                <div className='container'>
                    {(msg && 
                        <Alert variant='success'>
                            {msg}
                        </Alert>)}
                    <div>
                        {user ? 
                            <h2>
                                {user.name} <Button onClick={() => {
                                    window.localStorage.removeItem('loggedContactAppUser')
                                    setUser(null)
                                }}>Logout</Button>
                            </h2>
                            :
                            <LoginForm 
                                password={password} 
                                username={username} 
                                handleLogin={handleLogin}
                                setPassword={setPassword}
                                setUsername={setUsername}
                                />
                    }
                    </div>
                    <Routes>
                        <Route path='/' element={ <Home /> }/>
                        <Route path='/contacts' element={ 
                            user?
                                <Phonebook people={people} setPeople={setPeople} /> 
                                :
                                <h3>You must be logged in to see the Contacts</h3>
                        }/>
                        <Route path='/contacts/:id' element={ 
                        
                                <Contact contacts={people} /> 
                                
                        }/>
                    </Routes>
                </div>
            </Router> 
    );
}

export default App;
