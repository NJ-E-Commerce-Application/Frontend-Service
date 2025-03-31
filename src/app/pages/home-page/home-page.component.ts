import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Product } from '../../model/products';
import { ProductService } from '../../services/product/product.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Order } from '../../model/order';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import { MessagePromptComponent } from '../../shared/prompt/prompt.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [FormsModule, MessagePromptComponent],
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly productService = inject(ProductService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  isAuthenticated = false;
  products: Array<Product> = [];
  quantityIsNull = false;
  orderSuccess = false;
  orderFailed = false;

  @ViewChild(MessagePromptComponent)
  messagePromptComponent!: MessagePromptComponent; // Reference to child component
  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        this.productService
          .getProducts()
          .pipe()
          .subscribe((product) => {
            this.products = product;
          });
      }
    );
  }

  goToCreateProductPage() {
    this.router.navigateByUrl('/add-product');
  }

  goToGetInventoryPage() {
    this.router.navigateByUrl('/get-inventry');
  }

  orderProduct(product: Product, quantity: string) {
    this.oidcSecurityService.userData$.subscribe((result) => {
      const userDetails = {
        email: result.userData.email,
        firstName: result.userData.firstName,
        lastName: result.userData.lastName,
      };

      if (!quantity) {
        this.orderFailed = true;
        this.orderSuccess = false;
        this.quantityIsNull = true;
      } else {
        const order: Order = {
          skuCode: product.skuCode,
          price: product.price,
          quantity: Number(quantity),
          userDetails: userDetails,
        };

        this.orderService.orderProduct(order).subscribe(
          () => {
            this.orderSuccess = true;
            this.messagePromptComponent.displayMessage(
              'success',
              'Order placed successfully!'
            );
          },
          (error) => {
            this.orderFailed = false;
            this.messagePromptComponent.displayMessage(
              'error',
              'Failed to create the product.'
            );
          }
        );
      }
    });
  }
}
