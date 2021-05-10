import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ProductsComponent} from "./products/products.component";
import {OrdersComponent} from "./orders/orders.component";
import {HttpClient} from "@angular/common/http";
import {ProductOrder, ProductOrders} from "../app.module";
import {Subject} from "rxjs";

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit {
  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }
  collapsed = true;
  orderFinished = false;

  @ViewChild('productsC')
  productsC!: ProductsComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC!: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC!: OrdersComponent;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

  reset() {
    this.orderFinished = false;
    this.productsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }
}

@Injectable()
export class EcommerceService {
  private productsUrl = "/api/products";
  private ordersUrl = "/api/orders";

  private _productOrder!: ProductOrder;
  private _ProductOrders: ProductOrders = new ProductOrders();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private _total!: number;

  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get(this.productsUrl);
  }

  saveOrder(order: ProductOrders) {
    return this.http.post(this.ordersUrl, order);
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get ProductOrders(): ProductOrders {
    return this._ProductOrders;
  }

  set ProductOrders(value: ProductOrders) {
    this._ProductOrders = value;
  }

  get productOrder(): ProductOrder {
    return this._productOrder;
  }

  set productOrder(value: ProductOrder) {
    this._productOrder = value;
  }
}
