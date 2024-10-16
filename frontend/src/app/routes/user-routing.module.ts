import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ProductListComponent } from "../components/product-list/product-list.component";
import { ProductDetailComponent } from "../components/product-detail/product-detail.component";
import { RegisterComponent } from "../components/register/register.component";
import { LoginComponent } from "../components/login/login.component";
import { CartComponent } from "../components/cart/cart.component";
import { HomeComponent } from "../components/home/home.component";


const userRoutes : Routes = [
    {path:'products', component:ProductListComponent},
    {path: 'products/:p_id', component : ProductDetailComponent},
    {path:'register',component : RegisterComponent},
    {path:'login',component : LoginComponent},
    {path: 'cart', component : CartComponent},
    {path:'home',component : HomeComponent}
];
@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class userRoutingModule{}