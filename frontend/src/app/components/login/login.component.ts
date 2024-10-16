import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router, private tokenService : TokenService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      response => {
        const token = response.token; 
        this.tokenService.setToken(token); 

        const userRole = this.tokenService.getUserRole(); 

        // Navigate based on user role
        if (userRole === 'admin') {
          this.router.navigate(['/admin']);
        } else if (userRole === 'user') {
          this.router.navigate(['/products']);
        } else {
          this.router.navigate(['/login']); 
        }
      },
      error => {
        console.error('Login failed', error);
        this.loginError = 'Invalid email or password';
      }
    );
  }
}
