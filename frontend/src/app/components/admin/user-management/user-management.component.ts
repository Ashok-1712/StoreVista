// src/app/admin/user-management/user-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  userForm!: FormGroup;
  showAddUserForm = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required,Validators.minLength(6)]]
    });
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      console.log(this.userForm.valid);
      
      const newUser = this.userForm.value;
      this.userForm.value.role = "admin";
      

      console.log("new User :",newUser);
      this.authService.addUser(newUser).subscribe(() => {
        this.loadUsers();
        this.userForm.reset();
        this.showAddUserForm = false;
      }, error =>{
        console.error("error adding user : ", error);
      });
    }
  }

  deleteUser(userId: number): void {
    if(confirm("Are you sure you want delete this user ?")){
    this.authService.deleteUser(userId).subscribe({
      next : () =>{
      this.loadUsers();
      }, error : (err) =>{
        console.error("User not deleted :",err);
      }
    });
  }
}
}
