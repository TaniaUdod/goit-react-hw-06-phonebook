import { useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { getContacts } from '../redux/selectors';

export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm />
      <div>
        <h2>Contacts</h2>

        {contacts.length > 0 ? (
          <Filter />
        ) : (
          <div style={{ textAlign: 'center' }}>Your phonebook is empty 🥺</div>
        )}

        {contacts.length > 0 && <ContactList />}
      </div>
    </section>
  );
};
