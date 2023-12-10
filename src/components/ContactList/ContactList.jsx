import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredContacts } from '../../redux/selectors';
import { deleteContact } from '../../redux/contacts/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
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
