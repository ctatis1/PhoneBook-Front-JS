import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import contactServices from './services/contacts';
import loginServices from './services/login';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import Phonebook from './pages/Phonebook';
import Contact from './pages/Contact';

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
            setUsername('');
            setPassword('');
        } catch (error) {
            setMsg(`Wrong credentials`)
            setTimeout(() => {
                setMsg(null)
            }, 5000);
        }
    }

    return (
        <Router>
            <div>
                <h1>PhoneBook</h1>
                <Notification message={msg}/>
                <div>
                    <Link style={{padding:5}} to='/'>Home</Link>
                    <Link style={{padding:5}} to='/contacts'>Contacts</Link>
                    <Link style={{padding:5}} to='/users'>Users</Link>
                    {user ? 
                        <h2>
                            {user.name} <button onClick={() => {
                                window.localStorage.removeItem('loggedContactAppUser')
                                setUser(null)
                            }}>Logout</button>
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
