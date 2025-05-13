package Ecom.Repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import Ecom.Model.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

	// Recherche par nom de produit (contient une partie du nom)
	@Query("SELECT p FROM Product p WHERE p.name LIKE %:name%")
	List<Product> findByName(@Param("name") String name);

	// Recherche de produits par catégorie
	@Query("SELECT p FROM Product p WHERE p.category LIKE %:category%")
	List<Product> getProductCategoryName(@Param("category") String category);

	// Produits recommandés globalement (les plus populaires en se basant sur les commandes)
	@Query("SELECT p FROM Product p LEFT JOIN p.orderItem oi GROUP BY p ORDER BY COUNT(oi) DESC")
	List<Product> findTop6MostPopular();

	// Produits recommandés selon la catégorie (les plus populaires dans cette catégorie)
	@Query("SELECT p FROM Product p LEFT JOIN p.orderItem oi WHERE p.category = :category GROUP BY p ORDER BY COUNT(oi) DESC")
	List<Product> findTop6ByCategoryMostPopular(@Param("category") String category);

	// Recherche avec tri dynamique
	List<Product> findAllByNameContainingIgnoreCase(String keyword, Sort sort);



}


