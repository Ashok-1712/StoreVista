import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CartService, CartItem } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  cartForm: FormGroup;

  constructor(private cartService: CartService, private fb: FormBuilder) {
    this.cartForm = this.fb.group({
      items: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    // Subscribe to cart items observable
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.populateCartForm();
      this.calculateTotalPrice();
    });
  }

  populateCartForm(): void {
    const itemsArray = this.cartForm.get('items') as FormArray;
    itemsArray.clear(); 

    this.cartItems.forEach(item => {
        const group = this.fb.group({
            productId: [item.product.p_id],
            quantity: [item.quantity] 
        });

       
        group.get('quantity')?.valueChanges.subscribe(quantity => {
          
            const qty = quantity !== null ? quantity : 0; 
            this.cartService.updateQuantity(item.product.p_id, qty);
            this.calculateTotalPrice(); 
        });

        itemsArray.push(group);
    });
}


  calculateTotalPrice(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId); 
    this.populateCartForm();
    this.calculateTotalPrice(); 
  }

  clearCart(): void {
    this.cartService.clearCart(); 
    this.populateCartForm();
  }
}
