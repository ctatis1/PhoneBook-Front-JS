import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Contacts from './components/Contacts';
import PersonForm from './components/PersonForm';

const App = () => {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => setPeople(response.data));
    }, []);

    return (
        <div>
            <h1>PhoneBook</h1>
            <h3>Form</h3>
            <PersonForm people={people} setPeople={setPeople}/>
            <h3>Contacts</h3>
            <Contacts contacts={people}/>
        </div>
    );
}

export default App;
