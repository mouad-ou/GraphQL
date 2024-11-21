package org.example.controllers;

import lombok.AllArgsConstructor;
import org.example.entities.Compte;
import org.example.entities.Transaction;
import org.example.entities.TransactionRequest;
import org.example.entities.TypeTransaction;
import org.example.repositories.CompteRepository;
import org.example.repositories.TransactionRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
public class TransactionController {

    private final CompteRepository compteRepository;
    private final TransactionRepository transactionRepository;

    @MutationMapping
    public Transaction addTransaction(@Argument("transaction") TransactionRequest transactionRequest) {
        if (transactionRequest == null) {
            throw new RuntimeException("TransactionRequest is null");
        }

        Compte compte = compteRepository.findById(transactionRequest.getCompteId())
                .orElseThrow(() -> new RuntimeException("Compte not Found"));

        // Adjust account balance
        if (transactionRequest.getType() == TypeTransaction.DEPOT) {
            compte.setSolde(compte.getSolde() + transactionRequest.getMontant());
        } else if (transactionRequest.getType() == TypeTransaction.RETRAIT) {
            if (compte.getSolde() < transactionRequest.getMontant()) {
                throw new RuntimeException("Insufficient funds for withdrawal");
            }
            compte.setSolde(compte.getSolde() - transactionRequest.getMontant());
        } else {
            throw new RuntimeException("Invalid transaction type");
        }

        compteRepository.save(compte);

        Transaction transaction = new Transaction();
        transaction.setMontant(transactionRequest.getMontant());
        transaction.setDate(new Date());
        transaction.setType(transactionRequest.getType());
        transaction.setCompte(compte);

        return transactionRepository.save(transaction);
    }

    @QueryMapping
    public List<Transaction> compteTransactions(@Argument Long id) {
        Compte compte = compteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compte not Found"));
        return transactionRepository.findByCompte(compte);
    }

    @QueryMapping
    public Map<String, Object> transactionStats() {
        long count = transactionRepository.count();
        double sumDepots = transactionRepository.sumByType(TypeTransaction.DEPOT) != null
                ? transactionRepository.sumByType(TypeTransaction.DEPOT)
                : 0.0;
        double sumRetraits = transactionRepository.sumByType(TypeTransaction.RETRAIT) != null
                ? transactionRepository.sumByType(TypeTransaction.RETRAIT)
                : 0.0;

        return Map.of(
                "count", count,
                "sumDepots", sumDepots,
                "sumRetraits", sumRetraits
        );
    }
}
