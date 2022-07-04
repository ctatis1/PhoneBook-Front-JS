import React, {useState} from 'react';
import contactServices from '../services/contacts';
import Contact from './Contact';
import Notification from './Notification';


const Contacts = ({contacts, setPeople}) => {

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
            <form onSubmit={(e) => confirmDelete(e,contact)}>
                <Contact key={contact.id} contact={contact} /> 
            </form>
        ))}
        </>

    );
}

export default Contacts;
