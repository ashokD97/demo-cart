import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';

interface cartItem{
  name:string,
  price:number,
  quantity:number,
  total:number
}

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http :HttpClient) { }
  private cartItems = new Subject<any>();
  currentCart = this.cartItems.asObservable();

  getAllProducts(): Observable<any>{
    const _url = "assets/pos.products.json";
    return this.http.get(_url);
  }
  
  addToCart(item){
    this.getCart().subscribe(res=>{
      let _cart = res;
      res.forEach(element => {
        if(element['name'] == item['name']){
           _cart[element]['quantity']++;
           _cart[element]['total'] = _cart[element]['price']*_cart[element]['quantity'];
        }else{
          item['quantity'] = 1;
          item['total'] = item['price'];
          _cart.push(item);
        }
      });
      this.cartItems.next(_cart);
    });
  }

  getCart(){
    return this.currentCart;
  }
}
