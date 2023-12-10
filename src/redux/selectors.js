export const getContacts = state => state.contacts.list;

export const getFilterContacts = state => state.filter;

export const getFilteredContacts = state => {
  const contacts = getContacts(state);
  const filter = getFilterContacts(state);

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};
