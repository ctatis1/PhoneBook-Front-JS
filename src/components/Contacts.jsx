import React, {useState} from 'react';
import contactServices from '../services/contacts';
import Notification from './Notification';
import Toggleable from './Toggleable';


const Contacts = ({contacts, setPeople}) => {

    const contactStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
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
            <div className='contacts' style={contactStyle}>
                {contact.name} 
                <Toggleable buttonLabel='View'>
                    <form key={contact.id} onSubmit={(e) => confirmDelete(e,contact)}>
                        <p>Name: {contact.name}</p> 
                        <p>Number: {contact.number}</p> 
                        <button type='submit'> Delete</button>
                    </form>
                </Toggleable> 
            </div>
            
        ))}
        </>

    );
}

export default Contacts;
