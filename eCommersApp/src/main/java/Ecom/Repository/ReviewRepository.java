package Ecom.Repository;

import java.util.List;
import Ecom.Model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import Ecom.Model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
	
	@Query("SELECT r FROM Review r WHERE r.product.productId = :productId")
	List<Review> findAllReviewsByProductId(@Param("productId") Integer productId);

	@Query("SELECT r FROM Review r WHERE r.product = :product")
	List<Review> findByProduct(@Param("product") Product product);

}
