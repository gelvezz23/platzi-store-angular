import { Component, OnInit } from '@angular/core';

import { Product } from './../../../core/models/product.model';
import { ProductsService } from './../../../core/services/products/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsServices: ProductsService) {}

  ngOnInit() {
    this.fetchProdcuts();
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProdcuts() {
    this.productsServices
      .getAllProducts()
      .subscribe((products) => (this.products = products));
  }
}
