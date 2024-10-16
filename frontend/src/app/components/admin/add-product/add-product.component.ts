import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm!: FormGroup;
  selectedFile: File | null = null; 

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      p_name: ['', [Validators.required]],
      p_price: ['', [Validators.required, Validators.min(0)]],
      p_category: ['', Validators.required],
      p_description: [''],
      p_image: ['']
    });
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0]; 
    }
  }


  addProduct(): void {
    if (this.productForm.valid) {
     const formData: FormData = new FormData(); 
      formData.append('p_name', this.productForm.get('p_name')!.value);
      formData.append('p_price', this.productForm.get('p_price')!.value);
      formData.append('p_category', this.productForm.get('p_category')!.value);
      formData.append('p_description', this.productForm.get('p_description')!.value);
      if (this.selectedFile) {
        formData.append('p_image', this.selectedFile); 
      }

      this.productService.addProduct(formData).subscribe({
        next: () => {
          console.log('Product added successfully');
          this.router.navigate(['/admin/admin-product-list']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  // Cancel and navigate back
  cancel(): void {
    this.router.navigate(['/admin/admin-product-list']);
  }
}
