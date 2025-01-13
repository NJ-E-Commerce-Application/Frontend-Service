import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../model/products";
import { HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>('http://localhost:9000/api/product');
  }


  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>('http://localhost:9000/api/product', product);
  }
}
