import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION, GET_COMPTES, GET_TRANSACTIONS_BY_COMPTE } from '../apollo/queries';
import '../styles/AddTransaction.css';

const AddTransaction = ({ compteId, currentSolde, setCurrentSolde }) => {
  const [montant, setMontant] = useState('');
  const [type, setType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS_BY_COMPTE, variables: { id: compteId } }],
    onError: (error) => setErrorMessage(error.message),
    update: (cache, { data: { addTransaction } }) => {
      // Update the account balance dynamically
      if (addTransaction) {
        const updatedSolde =
          type === 'DEPOT'
            ? currentSolde + addTransaction.montant
            : currentSolde - addTransaction.montant;

        setCurrentSolde(updatedSolde);

        // Update the GET_COMPTES query cache
        const existingData = cache.readQuery({ query: GET_COMPTES });
        if (existingData) {
          const updatedComptes = existingData.allComptes.map((compte) =>
            compte.id === compteId
              ? { ...compte, solde: updatedSolde }
              : compte
          );
          cache.writeQuery({
            query: GET_COMPTES,
            data: { allComptes: updatedComptes },
          });
        }
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    addTransaction({ variables: { montant: parseFloat(montant), type, compteId } });
    setMontant('');
    setType('');
  };

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        type="number"
        placeholder="Amount"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="" disabled>Select Transaction Type</option>
        <option value="DEPOT">Deposit</option>
        <option value="RETRAIT">Withdrawal</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
