import { useDispatch, useSelector } from 'react-redux';
import { Form, Label, Input, Button } from './ContactForm.styled';
import { getContacts } from '../../redux/selectors';
import { addContact } from '../../redux/contacts/contactsSlice';

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const formName = event.target.elements.name.value;
    const formNumber = event.target.elements.number.value;

    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === formName.toLowerCase()
    );

    if (isExist) {
      alert(`${formName} is already in contacts.`);
      return;
    }

    dispatch(addContact(formName, formNumber));

    form.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={contacts.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          placeholder="Enter name"
          title="Name can include letters, apostrophes, spaces, and hyphens."
          autoComplete="off"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={contacts.number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          placeholder="Enter number"
          title="Phone number must consist of numbers and can contain spaces, periods, hyphens, and parentheses."
          autoComplete="off"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};
