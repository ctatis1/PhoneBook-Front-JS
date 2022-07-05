import React, { useState } from 'react';
import contactServices from '../services/contacts';
import Notification from './Notification';
import { Button, Form} from 'react-bootstrap';

const PersonForm = ({people, setPeople}) => {

    const [newName, setNewName] = useState('Your Name...');
    const [newNumber, setNewNumber] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

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
                console.log(actualPerson.id);
                contactServices
                    .update(actualPerson.id, newPerson)
                    .then(updatedPerson => {
                        setPeople(people.map(person => person.id !== actualPerson.id ? person: updatedPerson));
                        setErrorMessage(`${newName} was updated.`)
                        setTimeout(() => {
                            setErrorMessage('')
                        }, 3000);
                    }).catch(error => {
                        setErrorMessage(`${error}`)
                        setTimeout(() => {
                            setErrorMessage('')
                        }, 3000);
                        
                    })
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
                    setErrorMessage('added')
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 3000);
                })
                .catch(error => console.log(error.response.data))
        }
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }
    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }

    return (
        <>
            <Notification message={errorMessage}/>
            <Form onSubmit={addPeople}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} type='number' min="1" onChange={handleNumberChange}/>
                </div>
                <div>
                    <Button type='submit'>Add</Button>
                </div>
            </Form>
        </>
    );
}

export default PersonForm;
