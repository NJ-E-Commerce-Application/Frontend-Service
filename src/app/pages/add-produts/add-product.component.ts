import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product } from "../../model/products";
import { ProductService } from "../../services/product/product.service";
import { NgIf } from "@angular/common";
import { MessagePromptComponent } from '../../shared/prompt/prompt.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MessagePromptComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  addProductForm: FormGroup;
  private readonly productService = inject(ProductService);
  productCreated = false;

  @ViewChild(MessagePromptComponent) messagePromptComponent!: MessagePromptComponent; // Reference to child component

  constructor(private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      skuCode: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const product: Product = {
        skuCode: this.addProductForm.get('skuCode')?.value,
        name: this.addProductForm.get('name')?.value,
        description: this.addProductForm.get('description')?.value,
        price: this.addProductForm.get('price')?.value
      };
      this.productService.createProduct(product).subscribe({
        next: () => {
          this.productCreated = true;
          this.addProductForm.reset();
          // Display success message via the MessagePromptComponent
          this.messagePromptComponent.displayMessage('success', 'Product created successfully!');
        },
        error: () => {
          // Display error message
          this.messagePromptComponent.displayMessage('error', 'Failed to create the product.');
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  get skuCode() {
    return this.addProductForm.get('skuCode');
  }

  get name() {
    return this.addProductForm.get('name');
  }

  get description() {
    return this.addProductForm.get('description');
  }

  get price() {
    return this.addProductForm.get('price');
  }
}
