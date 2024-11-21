import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMPTE, GET_COMPTES } from '../apollo/queries';
import '../styles/AddCompte.css';

const AddCompte = () => {
  const [solde, setSolde] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const [type, setType] = useState('');

  const [saveCompte] = useMutation(ADD_COMPTE, {
    refetchQueries: [{ query: GET_COMPTES }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCompte({ variables: { solde: parseFloat(solde), dateCreation, type } });
    setSolde('');
    setDateCreation('');
    setType('');
  };

  return (
    <form className="add-compte-form" onSubmit={handleSubmit}>
      <h3>Add New Account</h3>
      <input
        type="number"
        placeholder="Balance"
        value={solde}
        onChange={(e) => setSolde(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Creation Date"
        value={dateCreation}
        onChange={(e) => setDateCreation(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="" disabled>Select Type</option>
        <option value="COURANT">Courant</option>
        <option value="EPARGNE">Epargne</option>
      </select>
      <button type="submit">Add Account</button>
    </form>
  );
};

export default AddCompte;
