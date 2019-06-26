import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../product-list-service/product-list.service';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private productListService : ProductListService) { }
  order={
    subTotal:null,
    tax:null,
    discount:null,
    total:null,
    quantity:null,
    taxPercent:null,
    discountPercent:null
  }
  ngOnInit() {
    this.productListService.currentCart.subscribe(res=>{
      this.order={
        subTotal:null,
        tax:null,
        discount:null,
        total:null,
        quantity:null,
        taxPercent:null,
        discountPercent:null
      };
       if(res.length){
         let quantity = 0;
         let price = 0;
         res.forEach(elem =>{
            quantity += elem['quantity'];
            price += elem['total'];
         });
         let taxPercent = 10;
         let discountPercent = 10;
         this.order.quantity = quantity;
          this.order.subTotal = price;
          this.order.taxPercent = taxPercent;
          this.order.discountPercent =discountPercent;
          this.order.tax = (+this.order.subTotal/+this.order.taxPercent);
          this.order.discount = (+this.order.subTotal/+this.order.discountPercent);;
          this.order.total = this.order.subTotal + this.order.tax - this.order.discount;      
       }
    })
  }

}
