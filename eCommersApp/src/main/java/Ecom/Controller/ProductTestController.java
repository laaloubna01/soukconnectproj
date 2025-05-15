package Ecom.Controller;

import Ecom.Model.Product;
import Ecom.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductTestController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/test")
    public List<Product> testProducts() {
        return productRepository.findAll();
    }
}