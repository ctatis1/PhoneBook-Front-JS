import React from 'react';
import Contacts from '../components/Contacts';
import PersonForm from '../components/PersonForm';
import Toggleable from '../components/Toggleable';

const Phonebook = ({people, setPeople}) => {


    return (
        <div>
            <Toggleable buttonLabel='New Contact'>
                <h3>Form</h3>
                <PersonForm people={people} setPeople={setPeople}/>
            </Toggleable>
            <h3>Contacts</h3>
            <Contacts contacts={people} setPeople={setPeople}/>
        </div>
    );
}

export default Phonebook;
