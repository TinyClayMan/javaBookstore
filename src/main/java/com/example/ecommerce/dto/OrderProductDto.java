package com.example.ecommerce.dto;

import com.example.ecommerce.model.Product;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
public class OrderProductDto {
    Product product;
    Integer quantity;
}
