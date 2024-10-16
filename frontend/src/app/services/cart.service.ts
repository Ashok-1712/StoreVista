import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: any; 
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';
  private cartItems: CartItem[] = this.loadCartItems(); 
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

 
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
  
    this.cartItems = this.loadCartItems();
  }

  private loadCartItems(): CartItem[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  private saveCartItems(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.product.p_id === product.p_id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.saveCartItems(); 
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.p_id !== productId);
    this.saveCartItems(); 
    this.cartItemsSubject.next(this.cartItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.product.p_id === productId);
    if (existingItem) {
      existingItem.quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(productId);
      }
    }
    this.saveCartItems();
    this.cartItemsSubject.next(this.cartItems);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.p_price * item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem(this.cartKey);
    this.cartItemsSubject.next(this.cartItems);
  }
}
