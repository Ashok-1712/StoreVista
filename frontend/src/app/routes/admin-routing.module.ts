import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { adminGuard } from "../guards/admin.guard";
import { AdminDashboardComponent } from "../components/admin/admin-dashboard/admin-dashboard.component";
import { AdminProductListComponent } from "../components/admin/admin-product-list/admin-product-list.component";
import { AddProductComponent } from "../components/admin/add-product/add-product.component";
import { EditProductComponent } from "../components/admin/edit-product/edit-product.component";

import { UserManagementComponent } from "../components/admin/user-management/user-management.component";

const adminRoutes : Routes = [
    {path : '', component : AdminDashboardComponent, canActivate : [adminGuard]},
    {path : 'add-product', component : AddProductComponent,canActivate : [adminGuard]},
    {path : 'edit-product/:p_id', component : EditProductComponent,canActivate : [adminGuard]},
    {path : 'admin-product-list', component : AdminProductListComponent,canActivate : [adminGuard]},
    {path : 'user-list',component : UserManagementComponent,canActivate : [adminGuard]},
];

@NgModule({
    imports : [RouterModule.forChild(adminRoutes)],
    exports : [RouterModule]
})
export class AdminRoutingModule{}