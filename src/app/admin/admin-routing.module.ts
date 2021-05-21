import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CreateProductsComponent } from './components/create-products/create-products.component';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'create', component: ProductFormComponent },

      { path: 'list', component: ListComponent },
      { path: 'products-list', component: ProductListComponent },
      { path: 'products-list/create', component: CreateProductsComponent },
      { path: 'products-list/edit/:id', component: EditProductsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
