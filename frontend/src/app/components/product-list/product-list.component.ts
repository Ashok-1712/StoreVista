import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = []; 
  showToast: boolean = false;
  notificationMessage: string = '';

  constructor(private productService: ProductService, private router: Router, private cartService: CartService, private tokenService : TokenService) {}

  ngOnInit(): void {
    this.loadAllProducts(); 
  }

  loadAllProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data; 
    });
  }
  loadProducts(filters: any = {}): void {
    this.productService.getProducts(filters).subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

 
  filterProducts(searchTerm: string = '', minPrice: string = '', maxPrice: string = '', category: string = ''): void {
    const filters = {
      search: searchTerm,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      category: category || ''
    };
    this.loadProducts(filters); 
  }

  isLoggedIn() : boolean {
    return !!this.tokenService.getToken() && !this.tokenService.isTokenExpired();
  }

  showLoginAlert(): void {
    alert("Please log in to add products to the cart.");
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log("ADDING PRODUCT TO CART", product);
  }

  viewProduct(product: any): void {
    console.log(product.p_id);
    this.router.navigate(['/products', product.p_id]);
  }
}
