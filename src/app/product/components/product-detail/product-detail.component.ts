import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      // this.product = this.productsService.getProduct(id);
    });
  }

  fetchProduct(id: string) {
    this.productsService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }

  createProduct() {
    const newProduct: Product = {
      id: '222',
      title: 'nuevo desde angular',
      image: './assets/images/camiseta.png',
      price: 3000,
      description: 'bla bla bla bla',
    };
    this.productsService
      .createProducts(newProduct)
      .subscribe((product) => console.log(product));
  }

  updateProduct() {
    const updateProduct: Product = {
      id: '222',
      title: 'edicion nuevo desde angular',
      image: './assets/images/camiseta.png',
      price: 34000,
      description: 'bla bla bla bla',
    };
    this.productsService
      .updateProduct(updateProduct.id, updateProduct)
      .subscribe((product) => (this.product = product));
  }

  deleteProduct() {
    this.productsService
      .deleteProduct('222')
      .subscribe((product) => console.log(product));
  }
}
