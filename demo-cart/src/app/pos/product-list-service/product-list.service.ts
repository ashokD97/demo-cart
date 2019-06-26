import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';

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
  private cartItems = new BehaviorSubject([]);
  currentCart = this.cartItems.asObservable();
  cartList:any;
  getAllProducts(): Observable<any>{
    const _url = "assets/pos.products.json";
    return this.http.get(_url);
  }
  
  addToCart(item){
   this.getCart();
    let _cart = this.cartList;
  
    if(_cart.length){
      let obj = _cart.findIndex(o => o.name === item['name']);
      if(_cart[obj]){
        _cart[obj]['quantity']++;
        _cart[obj]['total'] = +(_cart[obj]['price'])*_cart[obj]['quantity'];
      }else{
        item['quantity'] = 1;
        item['total'] = +(item['price'])*item['quantity'];
        _cart.push(item);
      }
    
    }else{
      item['quantity'] = 1;
      item['total'] = +(item['price'])*item['quantity'];
      _cart.push(item);
    }
    
    this.cartItems.next(_cart);
  }
  removeFromCart(item){
    this.getCart();
    let _cart = this.cartList;
  
    if(_cart.length){
      let obj = _cart.findIndex(o => o.name === item['name']);
      if(_cart[obj] && _cart[obj]['quantity']){
        _cart[obj]['quantity']--;
        _cart[obj]['total'] = +(_cart[obj]['price'])*_cart[obj]['quantity'];
        this.cartItems.next(_cart);
      }else{
        alert("Zero Quantity Already");
      }
      
    }else{
       alert("Zero Quantity Already");
    }
    
    
  }
  getCart(){
    return this.cartItems.subscribe(res=>{
      this.cartList = res;
    });
  }
  removeFromCartAll(item){
    this.getCart();
    let _cart = this.cartList;
    this.cartItems.next(_cart.filter(x=>{
        return x!=item;
    }));
  }
}
