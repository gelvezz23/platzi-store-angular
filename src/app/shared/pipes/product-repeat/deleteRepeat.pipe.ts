import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

@Pipe({
  name: 'deleteRepeats',
})
export class DeleteRepeatsPipe implements PipeTransform {
  transform(products: Product[], ...args: unknown[]): Product[] {
    const notRepeat: Product[] = [];

    products.forEach((value: Product) => {
      if (notRepeat.find((prod) => prod.id === value.id) === undefined) {
        notRepeat.push(value);
      }
    });

    return notRepeat;
  }
}
