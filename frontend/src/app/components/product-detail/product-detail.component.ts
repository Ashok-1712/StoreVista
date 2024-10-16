import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product:any;

  constructor(private productService : ProductService,private cartService : CartService,private tokenService : TokenService, private route : ActivatedRoute){}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('p_id');
    console.log('Product ID from route:', productId); 
    if(productId){
    this.productService.getProductById(+productId).subscribe((data : any) => {
      this.product = data;
    });
  } else{
    console.error("Product ID is null");
  }
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
  goBack():void{
    window.history.back();
  }

}
