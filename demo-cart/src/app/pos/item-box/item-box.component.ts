import { Component, OnInit, Input } from '@angular/core';
import { ProductListService } from '../product-list-service/product-list.service';

@Component({
  selector: 'item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.css']
})
export class ItemBoxComponent implements OnInit {

  constructor(private productsListService : ProductListService) { }

  ngOnInit() {
  }
  @Input('product') product;

  addToCart(product){
    let clickedItem = {name:product['name'],price:product['price']};
    this.productsListService.addToCart(clickedItem);
  }

}
