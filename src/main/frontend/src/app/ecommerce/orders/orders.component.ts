import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ProductOrders} from "../../app.module";
import {EcommerceService} from "../ecommerce.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: ProductOrders;
  total!: number;
  paid: boolean;
  sub!: Subscription;

  constructor(private ecommerceService: EcommerceService) {
    this.orders = this.ecommerceService.ProductOrders;
    this.paid = false;
  }

  ngOnInit() {
    this.paid = false;
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
      this.orders = this.ecommerceService.ProductOrders;
    });
    this.loadTotal(this.orders);
  }

  pay() {
    this.paid = true;
    this.ecommerceService.saveOrder(this.orders).subscribe();
  }

  private loadTotal(productOrders: ProductOrders): number {
    return productOrders.getTotal();
  }
}
