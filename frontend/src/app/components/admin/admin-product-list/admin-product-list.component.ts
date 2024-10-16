import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {
  products : Product[] =[];

  constructor(private productService : ProductService, private router : Router){}

  ngOnInit(): void {
      this.loadProducts();
  }

  loadProducts() : void {
    this.productService.getAdminProducts().subscribe({
      next : (data : Product[]) => {
        console.log(data);
        this.products = data;
      },
      error : (err) => {
        console.error("Error Fetching admin Products:", err);
      }
    });
  }

  addProduct():void{
    this.router.navigate(['admin/add-product']);
  }

  editProduct(productId : number) : void {
    console.log('Edit Product ID : ', productId);
    this.router.navigate(['admin/edit-product',productId]);
  }

  deleteProduct(productId : number) : void {
    if(confirm('Are you sure you want to delete this product ?')){
      this.productService.deleteProduct(productId).subscribe({
        next : () => {
          this.loadProducts();
        },
        error : (err) => {
          console.error('Error deleting product',err);
        }
      });
    }
  }
}
