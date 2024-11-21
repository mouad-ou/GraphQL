import { gql } from '@apollo/client';

// Queries
export const GET_COMPTES = gql`
  query GetComptes {
    allComptes {
      id
      solde
      dateCreation
      type
      transactions {
        id
        montant
        date
        type
      }
    }
  }
`;

export const GET_TRANSACTIONS_BY_COMPTE = gql`
  query CompteTransactions($id: ID!) {
    compteTransactions(id: $id) {
      id
      montant
      date
      type
    }
  }
`;

export const TOTAL_SOLDE_STATS = gql`
  query TotalSolde {
    totalSolde {
      count
      sum
      average
    }
  }
`;

export const TRANSACTION_STATS = gql`
  query TransactionStats {
    transactionStats {
      count
      sumDepots
      sumRetraits
    }
  }
`;

// Mutations
export const ADD_COMPTE = gql`
  mutation SaveCompte($solde: Float!, $dateCreation: String!, $type: TypeCompte!) {
    saveCompte(compte: { solde: $solde, dateCreation: $dateCreation, type: $type }) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($montant: Float!, $type: TypeTransaction!, $compteId: ID!) {
    addTransaction(transaction: { montant: $montant, type: $type, compteId: $compteId }) {
      id
      montant
      type
      date
    }
  }
`;
