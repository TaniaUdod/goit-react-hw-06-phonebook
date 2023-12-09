import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || initialState
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = contact => {
    const isExist = contacts.some(
      ({ name }) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      ...contact,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <div>
        <h2>Contacts</h2>

        {contacts.length === 0 ? (
          <div style={{ textAlign: 'center' }}>Your phonebook is empty 🥺</div>
        ) : (
          <>
            <Filter filter={filter} onFilterChange={handleFilterChange} />

            {filteredContacts().length > 0 && (
              <ContactList
                contacts={filteredContacts()}
                onDeleteContact={deleteContact}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
