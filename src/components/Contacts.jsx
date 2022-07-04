import React, {useState} from 'react';
import contactServices from '../services/contacts';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';


const Contacts = ({contacts, setPeople}) => {

    const history = useNavigate();
    const [msg, setMsg] = useState('');

    const confirmDelete = (e, contact) => {
        e.preventDefault();
        const deletedId = contact.id;
        const confirm = window.confirm(`Delete ${contact.name}?`)
        if(confirm){
            contactServices
                .deleteOne(contact.id)
                .then(() => {
                    contacts = contacts.filter(contact => contact.id !== deletedId)
                    setPeople(contacts);
                    setMsg(`${contact.name} was deleted.`);
                    setTimeout(() => {
                        setMsg('')
                    }, 3000);
                })
        }
    }

    return (
        <>
        <Notification message={msg}/>    
        {contacts.map(contact => (
            <div>
                {contact.name} <button onClick={() => history(`/contacts/${contact.id}`)}>View</button>
                    {/* <form key={contact.id} onSubmit={(e) => confirmDelete(e,contact)}>
                        <p>Name: {contact.name}</p> 
                        <p>Number: {contact.number}</p> 
                        <button type='submit'> Delete</button>
                    </form> */}
            </div>
            
        ))}
        </>

    );
}

export default Contacts;
