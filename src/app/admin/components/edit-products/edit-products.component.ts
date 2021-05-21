import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductsService } from './../../../core/services/products/products.service';
import { MyValidators } from './../../../utils/validators';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
})
export class EditProductsComponent implements OnInit {
  form: FormGroup | any;
  id: string | any;

  constructor(
    private formBuilder: FormBuilder,
    private productsServices: ProductsService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsServices
        .getProduct(this.id)
        .subscribe((product) => this.form.patchValue(product));
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.value) {
      const product = this.form.value;
      this.productsServices.updateProduct(this.id, product).subscribe((rta) => {
        console.log(rta);
        this.router.navigate(['./admin']);
      });
    }
    console.log(this.form.value);
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: [
        0,
        [
          Validators.required,
          MyValidators.isPriceValid,
          MyValidators.priceIsRequired,
        ],
      ],
      image: ['', []],
      description: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }
}
