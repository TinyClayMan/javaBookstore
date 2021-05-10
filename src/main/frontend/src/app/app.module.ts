import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { ShoppingCartComponent } from './ecommerce/shopping-cart/shopping-cart.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    EcommerceComponent,
    ProductsComponent,
    OrdersComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class Product {
  id: number;
  name: string;
  price: number;
  pictureUrl: string;

  constructor(id: number, name: string, price: number, pictureUrl: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.pictureUrl = pictureUrl;
  }
}
export class ProductOrder {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  getPrice(): number{
    return this.product.price;
  }
}
export class ProductOrders {
  productOrders: ProductOrder[] = [];
  totalPrice!: number

  getTotal(): number {
    this.totalPrice = 0;
    this.productOrders.forEach( (order) => {
        this.totalPrice+= order.getPrice();
      }
    )
    return this.totalPrice;
  }
}
