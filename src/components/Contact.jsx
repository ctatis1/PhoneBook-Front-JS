import React from 'react';

const Contact = ({contact}) => {
    return (
        <div>
            {contact.name}, {contact.number} 
            <button type='submit'> Delete</button>
        </div>
    );
}

export default Contact;
