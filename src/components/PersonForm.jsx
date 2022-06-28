import React, { useState } from 'react';
import contactServices from '../services/contacts';

const PersonForm = ({people, setPeople}) => {

    const [newName, setNewName] = useState('Your Name...');
    const [newNumber, setNewNumber] = useState('Your Number...');

    const addPeople = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        }
        const actualPerson = people.find(person => person.name === newPerson.name);

        if(actualPerson){
            const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
            if(confirm){
                contactServices
                    .update(actualPerson.id, newPerson)
                    .then(updatedPerson => setPeople(people.replace(person => person.id === updatedPerson.id)))
                window.location.reload();
            }else{
                alert(`${newName} is already on the phonebook`);
            }
        }else{
            contactServices
                .create(newPerson)
                .then(returnedContact => {
                    setPeople(people.concat(returnedContact));
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }
    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }

    return (
        <form onSubmit={addPeople}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    );
}

export default PersonForm;
