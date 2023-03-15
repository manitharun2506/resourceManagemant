import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private http: UserService) {}

  visiblity: boolean = true;

  loginForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    console.log(this.visiblity,"qwert")
    if (this.visiblity === true) {
      //sign up manager

        this.http.createOrRegisterManager(this.loginForm.value).subscribe({
          next: (res: any) => {
            alert('sucessfully created manager you can login now'),
              this.visiblity = false
          },
          error: (err: any) => {
            console.log(err.status)
            if (err.status===400) {
              alert(err.error.msg);
            } else {
              alert('enter the inputs correctly');
            }
          },
        });
    } else {
      if (
        this.loginForm.value.password == 'admin' &&
        this.loginForm.value.email == 'admin'
      ) {
        this.router.navigate(['/admin']);
        return
      }
      
      this.http.loginManager(this.loginForm.value).subscribe({
        next:(res:any)=>{
          alert("sucessfully logged in")
          sessionStorage.setItem('manager',JSON.stringify(res))
          this.router.navigate(['/managerProfile'])
        },
        error:(err:any)=>{
          alert(err.error.msg)
        }
      })
    }
  }
}
