import React from 'react';
import '../styles/CompteCard.css';

const CompteCard = ({ compte }) => {
  return (
    <div className="card">
      <h3>Compte ID: {compte.id}</h3>
      <p><strong>Type:</strong> {compte.type}</p>
      <p><strong>Solde:</strong> {compte.solde} €</p>
      <p><strong>Date de création:</strong> {compte.dateCreation}</p>
      <h4>Transactions:</h4>
      <ul>
        {compte.transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type}: {transaction.montant} € le {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompteCard;
