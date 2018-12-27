package com.mamasnack.dao;

 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mamasnack.entities.Cuisine;
import com.mamasnack.entities.Produit;

public interface CuisineRepository extends JpaRepository<Cuisine, Long>{
	@Query("SELECT o FROM Cuisine o WHERE  o.idCuisine like :x")
	public Cuisine getfinOne(@Param("x") Long idC); 
	
	@Query("SELECT o FROM Cuisine o WHERE  o.nameCuisine like :x")
	public Cuisine getByName(@Param("x") String nom);
	
	@Query("SELECT o FROM Cuisine o WHERE  o.idCuisine like :x")
	public Cuisine existsCuisine(@Param("x") Long idCuisine);
} 