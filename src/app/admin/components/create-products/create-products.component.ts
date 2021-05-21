import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ProductsService } from './../../../core/services/products/products.service';
import { MyValidators } from './../../../utils/validators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
})
export class CreateProductsComponent implements OnInit {
  form: FormGroup | any;
  image$: Observable<any> | any;
  constructor(
    private formBuilder: FormBuilder,
    private productsServices: ProductsService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.value) {
      const product = this.form.value;
      this.productsServices.createProducts(product).subscribe((rta) => {
        console.log(rta);
        this.router.navigate(['./admin']);
      });
    }
    console.log(this.form.value);
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
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

  uploadFile(event: any) {
    //event.preventDefault();
    const file = event.target.files[0];
    const dir = 'images';
    const fileRef = this.storage.ref(dir);
    const task = this.storage.upload(dir, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe((url: string) =>
            this.form.get('image').setValue(url)
          );
        })
      )
      .subscribe();
    console.log(file);
  }
  get priceField() {
    return this.form.get('price');
  }
}
