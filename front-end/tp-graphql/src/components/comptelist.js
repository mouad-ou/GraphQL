import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMPTES } from '../apollo/queries';
import '../App.css';

const CompteList = ({ onSelectCompte }) => {
  const { loading, error, data } = useQuery(GET_COMPTES);

  if (loading) return <p>Loading accounts...</p>;
  if (error) return <p>Error loading accounts: {error.message}</p>;

  return (
    <div className="compte-list">
      {data.allComptes.map((compte) => (
        <div
          className="compte-card"
          key={compte.id}
          onClick={() => onSelectCompte(compte.id, compte.solde)}
        >
          <h3>Account ID: {compte.id}</h3>
          <p>
            <strong>Type:</strong> {compte.type}
          </p>
          <p>
            <strong>Balance:</strong> {compte.solde} €
          </p>
          <p>
            <strong>Created On:</strong> {compte.dateCreation}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CompteList;
