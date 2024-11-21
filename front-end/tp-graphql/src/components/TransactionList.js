import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS_BY_COMPTE } from '../apollo/queries';
import '../styles/TransactionList.css';

const TransactionList = ({ compteId }) => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS_BY_COMPTE, {
    variables: { id: compteId },
  });

  if (loading) return <p className="loading">Loading transactions...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="transaction-list">
      <h3>Transactions</h3>
      {data.compteTransactions.length > 0 ? (
        <ul>
          {data.compteTransactions.map((transaction) => (
            <li key={transaction.id} className={`transaction ${transaction.type.toLowerCase()}`}>
              <strong>{transaction.type}:</strong> {transaction.montant}€ on{' '}
              {new Date(transaction.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default TransactionList;
