import React from 'react';
import contactServices from '../services/contacts';

const Contacts = ({contacts, setPeople}) => {

    const confirmDelete = (contact) => {
        const confirm = window.confirm(`Delete ${contact.name}?`)
        if(confirm){
            contactServices
                .deleteOne(contact.id)
                .then(deletedContact => {
                    contacts = contacts.filter(contact => contact.id !== deletedContact.id)
                    setPeople(contacts);
                    window.location.reload()
                })
        }
    }

    return (
        contacts.map(contact => (
            <div>
                {contact.name}, {contact.number}
                <button onClick={() => confirmDelete( contact)}>Delete</button>
            </div>
            
        ))
    );
}

export default Contacts;
