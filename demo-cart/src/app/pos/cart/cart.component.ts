import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../product-list-service/product-list.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private productListService :ProductListService) { }
  cartItems:any;
  ngOnInit() {
    this.productListService.currentCart.subscribe(res=>{
      this.cartItems = res;
    });
  }

  addToCart(item){
    this.productListService.addToCart(item);
  }
  removeFromCart(item){
    this.productListService.removeFromCart(item);
  }
  removeFromCartAll(item){
    this.productListService.removeFromCartAll(item);
  }
}
