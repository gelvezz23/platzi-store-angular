import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './../../models/product.model';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products/`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }
  createProducts(product: Product) {
    return this.http.post(`${environment.url_api}/products/`, product);
  }
  updateProduct(id: string, change: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, change);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }
}
