package org.example.repositories;

import org.example.entities.Compte;
import org.example.entities.Transaction;
import org.example.entities.TypeTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByCompte(Compte compte);

    @Query("SELECT SUM(t.montant) FROM Transaction t WHERE t.type = :type")
    Double sumByType(TypeTransaction type);
}
