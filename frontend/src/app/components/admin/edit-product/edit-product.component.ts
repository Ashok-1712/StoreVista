import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  productForm!: FormGroup;
  productId!: number; 
  product!: Product;
  selectedImage: File | null = null;
  currentImageUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('p_id')); 
    this.initializeForm();
    this.loadProductData();
  }

  initializeForm(): void {
    this.productForm = this.formBuilder.group({
      p_name: ['', [Validators.required]],
      p_price: ['', [Validators.required]],
      p_category: ['', Validators.required],
      p_description: [''],
    });
  }

  loadProductData(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.currentImageUrl = product.p_image; 
        this.productForm.patchValue({
          p_name: product.p_name || '',
          p_price: Number(product.p_price),
          p_category: product.p_category || '',
          p_description: product.p_description || '',
        });
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedImage = input.files[0];
    } else {
      this.selectedImage = null;
    }
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      const formData: FormData = new FormData(); 
      formData.append('p_name', this.productForm.get('p_name')!.value);
      formData.append('p_price', this.productForm.get('p_price')!.value);
      formData.append('p_category', this.productForm.get('p_category')!.value);
      formData.append('p_description', this.productForm.get('p_description')!.value);
      
      if (this.selectedImage) {
        formData.append('p_image', this.selectedImage); 
      }

      this.productService.editProduct(this.productId, formData).subscribe({
        next: (updatedProduct: Product) => {
          console.log('Product updated successfully');
          this.currentImageUrl = updatedProduct.p_image; 
          this.router.navigate(['/admin/admin-product-list']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/admin-product-list']);
  }
}
