import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  isDisabled = true;

  constructor(private http: UserService, private router: Router) {}
  sessiondata: any;
  ngOnInit(): void {
    const data = sessionStorage.getItem('profile');
    if (!data) {
      this.router.navigate(['/userLogin']);
      alert('please login');
    }
    this.sessiondata = JSON.parse(data || '');
    console.log(this.sessiondata);
    this.userData.patchValue({
      id: this.sessiondata.id,
      name: this.sessiondata.name,
      email: this.sessiondata.email,
      password: this.sessiondata.password,
      phone: this.sessiondata.phone,
      skillSet:this.sessiondata.skillSet,
      currentManagerName: this.sessiondata.currentManagerName,
      currentManagerEmail: this.sessiondata.currentManagerEmail,
      currentManagerPhone: this.sessiondata.currentManagerPhone,
      isInTraining: this.sessiondata.isInTraining,
      achiements: this.sessiondata.achiements,
      currentProjectDetail: this.sessiondata.currentProjectDetail,
    });
  }
  showdata: boolean = false;

  userData: FormGroup = new FormGroup({
    id: new FormControl(''),
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
    isInTraining: new FormControl(''),
    achievements: new FormControl(''),
  });

  logOut() {
    sessionStorage.clear();
    alert('successfully logged off');
    this.router.navigate(['/userLogin']);
  }

  Update() {
    console.log(this.userData.value)
    this.http.updateProfile(this.userData.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
