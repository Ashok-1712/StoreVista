import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: 'admin',
    loadChildren: () => import('./routes/admin-routing.module').then(m => m.AdminRoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./routes/user-routing.module').then(m => m.userRoutingModule)
  },
  {
    path: '**',
    redirectTo : 'products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

