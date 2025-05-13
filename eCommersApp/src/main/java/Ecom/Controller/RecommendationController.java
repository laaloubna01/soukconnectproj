package Ecom.Controller;

import Ecom.Model.Product;
import Ecom.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getRecommendedProducts(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            // Recommandation basée sur les produits populaires d'une catégorie
            return productRepository.findTop6ByCategoryMostPopular(category);
        }
        // Recommandation globale : produits les plus populaires
        return productRepository.findTop6MostPopular();
    }
}
