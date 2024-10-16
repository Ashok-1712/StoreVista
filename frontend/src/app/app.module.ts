import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';
import { AdminProductListComponent } from './components/admin/admin-product-list/admin-product-list.component';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { FilterComponent } from './components/filter/filter.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductCardComponent } from './components/reusable/product-card/product-card.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    RegisterComponent,
    LoginComponent,
    AdminDashboardComponent,
    AddProductComponent,
    EditProductComponent,
    AdminProductListComponent,
    UserManagementComponent,
    SiteHeaderComponent,
    FilterComponent,
    CartComponent,
    ProductCardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
