import React, {useState} from 'react';
import contactServices from '../services/contacts';
import Notification from './Notification';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';


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
        <div>
            <Notification message={msg}/>    
            <Table striped>
                <tbody>
                {contacts.map(contact => (
                    <tr key={contact.id}>
                        <td>
                            <Link to={`/contacts/${contact.id}`}>
                                {contact.name}
                            </Link>
                        </td>
                        <td>
                            {contact.user} 
                        </td>
                        <td>
                            <Button onClick={(e) => confirmDelete(e, contact)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>

    );
}

export default Contacts;
