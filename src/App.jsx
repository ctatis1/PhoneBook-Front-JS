import React, { useEffect, useState } from 'react';
import Contacts from './components/Contacts';
import PersonForm from './components/PersonForm';
import contactServices from './services/contacts';

const App = () => {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        contactServices
            .getAll()
            .then(initialPeople => setPeople(initialPeople));
    }, []);

    return (
        <div>
            <h1>PhoneBook</h1>
            <h3>Form</h3>
            <PersonForm people={people} setPeople={setPeople}/>
            <h3>Contacts</h3>
            <Contacts contacts={people} setPeople={setPeople}/>
        </div>
    );
}

export default App;
