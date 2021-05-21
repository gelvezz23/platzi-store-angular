import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];

  constructor(private productsServices: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }
  fetchProducts() {
    this.productsServices
      .getAllProducts()
      .subscribe((products) => (this.products = products));
  }
  deleteProduct(id: string) {
    this.productsServices.deleteProduct(id).subscribe((rta) => {
      if (rta) {
        const index = this.products.findIndex((product) => product.id === id);
        this.products.splice(index, 1);
        this.products = [...this.products];
      }
    });
  }
}
