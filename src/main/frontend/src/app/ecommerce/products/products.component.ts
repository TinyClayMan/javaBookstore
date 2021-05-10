import { Component, OnInit } from '@angular/core';
import {Product, ProductOrder, ProductOrders} from "../../app.module";
import {Subscription} from "rxjs";
import {EcommerceService} from "../ecommerce.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  selectedProductOrder!: ProductOrder;
  private shoppingCartOrders!: ProductOrders;
  sub!: Subscription;
  productSelected: boolean = false;

  constructor(private ecommerceService: EcommerceService) {}

  ngOnInit() {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts() {
    this.ecommerceService.getAllProducts()
      .subscribe(
        (products: any) => {
          this.products = products;
          this.products.forEach(product => {
            this.productOrders.push(new ProductOrder(product, 0));
          })
        },
        (error) => console.log(error)
      );
  }

  loadOrders() {
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    });
  }

  addToCart(order: ProductOrder) {
    this.ecommerceService.productOrder = order; //.SelectedProductOrder
    this.selectedProductOrder = this.ecommerceService.productOrder; //.SelectedProductOrder
    this.productSelected = true;
  }

  removeFromCart(productOrder: ProductOrder) {
    let index = this.getProductIndex(productOrder);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder), 1);
    }
    this.ecommerceService.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    this.productSelected = false;
  }

  getProductIndex(product: ProductOrder) {
    return this.productOrders.indexOf(product);
  }

  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.ecommerceService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
  }

  isProductSelected(product: Product) {
    return this.productSelected;
  }
}
