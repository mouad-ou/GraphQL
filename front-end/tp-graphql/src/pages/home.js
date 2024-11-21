import React, { useState } from 'react';
import AddCompte from '../components/addcompte';
import CompteList from '../components/comptelist';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';
import '../App.css';

const Home = () => {
  const [selectedCompteId, setSelectedCompteId] = useState(null);
  const [selectedCompteSolde, setSelectedCompteSolde] = useState(0);

  const handleSelectCompte = (id, solde) => {
    setSelectedCompteId(id);
    setSelectedCompteSolde(solde);
  };

  return (
    <div className="home">
      <h1>Account Management</h1>
      <AddCompte />
      <CompteList
        onSelectCompte={(id, solde) => handleSelectCompte(id, solde)}
      />
      {selectedCompteId && (
        <div className="transaction-section">
          <h2>Transactions for Account ID: {selectedCompteId}</h2>
          <p>
            <strong>Current Balance:</strong> {selectedCompteSolde} €
          </p>
          <AddTransaction
            compteId={selectedCompteId}
            currentSolde={selectedCompteSolde}
            setCurrentSolde={setSelectedCompteSolde}
          />
          <TransactionList compteId={selectedCompteId} />
        </div>
      )}
    </div>
  );
};

export default Home;
