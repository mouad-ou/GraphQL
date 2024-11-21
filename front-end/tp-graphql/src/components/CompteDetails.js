import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMPTE_BY_ID } from '../apollo/queries';

const CompteDetails = ({ id }) => {
  const { loading, error, data } = useQuery(GET_COMPTE_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { solde, dateCreation, type, transactions } = data.compteById;

  return (
    <div>
      <h2>Account Details</h2>
      <p>
        <strong>ID:</strong> {id} <br />
        <strong>Type:</strong> {type} <br />
        <strong>Balance:</strong> {solde}€ <br />
        <strong>Created On:</strong> {dateCreation}
      </p>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type}: {transaction.montant}€ on {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompteDetails;
