import { useState } from 'react';

import PropTypes from 'prop-types';

import initialStateForm from '../initialStateForm';

import styles from '../App.module.css';

const PhoneBookForm = ({ onSubmit, isDuplicate }) => {
  const [state, setState] = useState({ ...initialStateForm });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name } = state;
    onSubmit({ name, number });
    if (!isDuplicate(name)) {
      setState({ ...initialStateForm });
    }
  };

  const { name, number } = state;
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="">Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="">Number</label>
        <input
          onChange={handleChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>

      <button type="submit">Add contact</button>
    </form>
  );
};

export default PhoneBookForm;

PhoneBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isDuplicate: PropTypes.func.isRequired,
};
