import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
  userRole: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private tokenService: TokenService, private cartService: CartService) {}

  ngOnInit() {
    this.tokenService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated; 
      this.userRole = this.tokenService.getUserRole(); 
    });
  }

  logout(): void {
    this.tokenService.removeToken();
    this.cartService.clearCart();
    this.router.navigate(['login']);
  }

  isAdmin(): boolean {
    return this.userRole === 'admin'; 
  }
}
