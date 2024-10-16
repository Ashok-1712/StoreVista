import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:3000/products';
  private categoryUrl = "http://localhost:3000/products/categories";

  constructor(private http : HttpClient) {}

  getProducts(filters : any={}): Observable<Product[]> {
    let params = new HttpParams();

   
    if (filters.search) {
      params = params.set('search', filters.search);
    }


    if (filters.minPrice) {
      params = params.set('minPrice', filters.minPrice);
    }

    
    if (filters.maxPrice) {
      params = params.set('maxPrice', filters.maxPrice);
    }

  
    if (filters.category) {
      params = params.set('category', filters.category);
    }

    
    return this.http.get<Product[]>(this.productUrl, { params });
  }
  getProductById(productId : number) : Observable<any> {
    return this.http.get<any>(`${this.productUrl}/${productId}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  getAdminProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl);
  }

  addProduct(product : FormData ) : Observable<any> {
    return this.http.post<any>(this.productUrl, product);
  }

  editProduct(productId: number, updatedProduct: FormData) : Observable<Product>{
    return this.http.put<Product>(`${this.productUrl}/${productId}`,updatedProduct);
  }

  deleteProduct(id : number) : Observable<void> {
    return this.http.delete<void>(`${this.productUrl}/${id}`);
  }
  
}
