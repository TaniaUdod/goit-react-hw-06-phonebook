import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilterContacts } from '../../redux/selectors';
import { deleteContact } from '../../redux/contacts/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterContacts);
  const dispatch = useDispatch();

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <List>
      {filteredContacts().map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={() => handleDelete(id)}
        />
      ))}
    </List>
  );
};
