import React, { useState } from 'react';
import Contacts from './components/Contacts';
import PersonForm from './components/PersonForm';

const App = () => {

    const [people, setPeople] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);

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
