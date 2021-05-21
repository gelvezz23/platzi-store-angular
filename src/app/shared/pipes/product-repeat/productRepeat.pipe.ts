import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Pipe({
  name: 'productRepeat',
})
export class CartPipe implements PipeTransform {
  products: Product[] | any;

  constructor(private cartService: CartService) {}

  transform(product: any, args?: any): any {
    var total = 0;
    this.cartService.cart$.subscribe((products) => {
      products.forEach((elemento) => {
        if (elemento.id === product.id) {
          total += 1;
        }
      });
    });
    return total;
  }
}
