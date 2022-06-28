import React, { useState } from 'react';

const PersonForm = ({people, setPeople}) => {

    const [newName, setNewName] = useState('Your Name...');
    const [newNumber, setNewNumber] = useState('Your Number...');

    const addPeople = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        }
        if(people.find(person => person.name === newPerson.name)){
            alert(`${newName} is already on the phonebook`);
        }else{
            setPeople(people.concat(newPerson));
            setNewName('')
            setNewNumber('')
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
