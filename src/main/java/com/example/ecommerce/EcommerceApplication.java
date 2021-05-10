package com.example.ecommerce;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EcommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(ProductService productService) {
        return args -> {
            productService.save(new Product(1L, "Game of Thrones", 300.00, "http://placehold.it/200x100"));
            productService.save(new Product(2L, "Harry Potter", 200.00, "http://placehold.it/200x100"));
            productService.save(new Product(3L, "Lord of the Rings", 100.00, "http://placehold.it/200x100"));
            productService.save(new Product(4L, "101: How to read another book", 5.00, "http://placehold.it/200x100"));
            productService.save(new Product(5L, "One Hundred Years of Solitude", 3.00, "http://placehold.it/200x100"));
            productService.save(new Product(6L, "The Death of Ivan Ilyich", 500.00, "http://placehold.it/200x100"));
            productService.save(new Product(7L, "The Doomed City", 30.00, "http://placehold.it/200x100"));
        };
    }
}