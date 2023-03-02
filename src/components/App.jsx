import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './ContactList/ContactList';
import PhoneBookFilter from './PhoneBookFilter/PhoneBookFilter';
import PhoneBookForm from './PhoneBookForm/PhoneBookForm';

import styles from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('myContacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('myContacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDuplicate = name => {
    const normalizeName = name.toLowerCase();
    const contact = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizeName;
    });
    return Boolean(contact);
  };

  const addContact = ({ name, number }) => {
    if (isDuplicate(name)) {
      return alert(`${name} is already in contacts`);
    }

    setContacts(prevState => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...prevState];
    });
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilterContacts = () => {
    if (!filter.trim()) {
      return contacts;
    }
    const normalizeFilter = filter.toLowerCase();
    const rezult = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizeFilter);
    });
    return rezult;
  };

  const filteredContacts = getFilterContacts();
  const isContacts = Boolean(filteredContacts.length);
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <h1 className={styles.title}>Phonebook</h1>
        <PhoneBookForm onSubmit={addContact} isDuplicate={isDuplicate} />
      </div>

      <div className={styles.block}>
        <h2 className={styles.title}>Contacts</h2>
        <PhoneBookFilter handleChange={handleFilter} />
        <ContactList
          removeContact={removeContact}
          contacts={filteredContacts}
        />
        {!isContacts && <p>Contacts list is empty!</p>}
      </div>
    </div>
  );
};
