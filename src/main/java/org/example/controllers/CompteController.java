package org.example.controllers;

import lombok.AllArgsConstructor;
import org.example.entities.Compte;
import org.example.entities.TypeCompte;
import org.example.repositories.CompteRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
public class CompteController {

    private final CompteRepository compteRepository;

    @QueryMapping
    public List<Compte> allComptes() {
        return compteRepository.findAll();
    }

    @QueryMapping
    public Compte compteById(@Argument Long id) {
        return compteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Compte %s not found", id)));
    }

    @QueryMapping
    public List<Compte> findByType(@Argument TypeCompte type) {
        return compteRepository.findByType(type);
    }

    @QueryMapping
    public List<Compte> deleteCompte(@Argument Long id) {
        compteRepository.deleteById(id);
        return compteRepository.findAll();
    }

    @MutationMapping
    public Compte saveCompte(@Argument("compte") Map<String, Object> compteMap) {
        Compte compte = new Compte();
        compte.setSolde(Double.valueOf(compteMap.get("solde").toString()));
        compte.setType(TypeCompte.valueOf(compteMap.get("type").toString()));
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse(compteMap.get("dateCreation").toString());
            compte.setDateCreation(date);
        } catch (ParseException e) {
            throw new RuntimeException("Invalid date format, expected yyyy-MM-dd", e);
        }

        return compteRepository.save(compte);
    }

    @QueryMapping
    public Map<String, Object> totalSolde() {
        long count = compteRepository.count();
        double sum = compteRepository.sumSoldes();
        double average = count > 0 ? sum / count : 0;

        return Map.of(
                "count", count,
                "sum", sum,
                "average", average
        );
    }
}
