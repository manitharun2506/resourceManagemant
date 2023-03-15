import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  constructor(private router: Router, private http: UserService) {}

  visiblity: boolean = true;

  loginForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    currentManagerName: new FormControl(''),
    currentManagerEmail: new FormControl(''),
    currentManagerPhone: new FormControl(''),
    skillSet: new FormControl(''),
    startDateOfProject: new FormControl(''),
    endDateOfProject: new FormControl(''),
    currentProjectDetail: new FormControl(''),
  });

  submit() {
    if (this.visiblity === false) {
      this.http.createOrRegister(this.loginForm.value).subscribe({
        next: (res: any) => {
          alert('succesfully created your profile please login');
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
      this.visiblity = true;

      //signUp
    } else {
      let body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.http.loginprofile(body).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('profile', JSON.stringify(res));
          this.router.navigate(['/userProfile']);
          alert('successfully logged in');
        },
        error:(err:any)=>{
          alert("check your email and password")
        }
      });
    }
  }
}
