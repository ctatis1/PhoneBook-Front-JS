import React from 'react';

const Contacts = ({contacts}) => {
    return (
        contacts.map(contact => (
            <div>
                {contact.name}, {contact.number}
            </div>
            
        ))
    );
}

export default Contacts;
