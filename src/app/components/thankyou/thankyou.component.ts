import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-thankyou',
  imports: [CommonModule],
  templateUrl: './thankyou.component.html',
  styleUrl: './thankyou.component.scss',
})
export class ThankyouComponent implements OnInit {
  OrderDetails: any;
  OrderId: any;
  constructor(private orderservice: OrderService) {}

  ngOnInit(): void {
    this.GetOrderDetails();
  }

  GetOrderDetails() {
    this.OrderId = localStorage.getItem('OrderId');
    this.orderservice.getorderdetails(this.OrderId).subscribe((data) => {
      this.OrderDetails = data;
      console.log("OrderDetails",this.OrderDetails);
    });
    setTimeout(()=>{
      localStorage.removeItem('OrderId');
    },0);
  }

}
