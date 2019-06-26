import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../product-list-service/product-list.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  allProducts:any;
  constructor(private productsListService : ProductListService) { }
  
  ngOnInit() {
    this.productsListService.getAllProducts().subscribe((res=>{
      this.allProducts = res;
    }));
   
  }
 
}
