import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup;
  passwordMisMatch : boolean = false;
  emailExists: boolean = false;

  constructor(private authService : AuthService, private router : Router){}

  ngOnInit() : void{
    this.registerForm= new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required])
    });
  }
  onSubmit(): void{

    if(!this.registerForm.valid){
      console.log("Form is Invalid");
      return
    }

      const {email , password , confirmPassword} = this.registerForm.value;
      console.log("Registering user with payload: ", { email, password });

      if(password !==confirmPassword){
        this.passwordMisMatch = true;
        return;
      }else{
        this.passwordMisMatch = false;
      }


        this.authService.register(email,password).subscribe(response => {
          console.log("user registered : ", response);
          this.emailExists = false;
          this.router.navigate(['login']);
        }, error =>{
          if (error.status === 400 && error.error.message === "The user already exists") {
            this.emailExists = true;
          } else {
            console.error("Registration failed:", error);
            this.emailExists = false;
          }
        });
      }
  
    }
