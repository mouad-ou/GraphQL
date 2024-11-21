import React from 'react';
import { useQuery } from '@apollo/client';
import { TOTAL_SOLDE_STATS, TRANSACTION_STATS } from '../apollo/queries';

const Stats = () => {
  const { data: soldeData, loading: soldeLoading } = useQuery(TOTAL_SOLDE_STATS);
  const { data: transactionData, loading: transactionLoading } = useQuery(TRANSACTION_STATS);

  if (soldeLoading || transactionLoading) return <p>Loading statistics...</p>;

  return (
    <div>
      <h3>Statistics</h3>
      <p>Total Accounts: {soldeData?.totalSolde?.count || 0}</p>
      <p>Total Balance: {soldeData?.totalSolde?.sum || 0}€</p>
      <p>Average Balance: {soldeData?.totalSolde?.average || 0}€</p>
      <p>Total Deposits: {transactionData?.transactionStats?.sumDepots || 0}€</p>
      <p>Total Withdrawals: {transactionData?.transactionStats?.sumRetraits || 0}€</p>
    </div>
  );
};

export default Stats;
