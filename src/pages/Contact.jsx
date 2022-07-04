import React from 'react';
import { useParams } from 'react-router-dom';

const Contact = ({contacts}) => {
    const id = useParams().id
    let contact = contacts.find(contact => contact.id === id);
    
    return (
        <div>
            <h4>Name: {contact.name} </h4>
            <h4>Number: {contact.number}</h4>
        </div>
    );
}

export default Contact;
