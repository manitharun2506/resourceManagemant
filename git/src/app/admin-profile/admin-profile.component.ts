import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  requests: any;

  constructor(private router: Router, private http: UserService) {}
  ngOnInit(): void {
    if (!sessionStorage.getItem('admin')) {
      alert('please login ');
      this.router.navigate(['/login']);
    } else {
    }
  }

  logOut() {
    sessionStorage.clear();
  }

  getAllPending() {
    this.http.getAllProfilePendingRequests().subscribe({
      next: (res: any) => {
        this.requests = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  editRequest(body: any, accept: boolean) {
    if (accept === true) {
      body.status = 'ACCEPTED';
    } else {
      body.status = 'REJECTED';
    }
    this.http.AcceptRequest(body).subscribe({
      next: (res: any) => {
        console.log(res);
    this.getAllPending();///refreshing

      },
      error: (err: any) => {
        console.log(err);
      },
    });

   if(accept===true){
    let user = {
      id: body.profile.id,
      currentManagerName: body.manager.name,
    };
    this.http.updateProfile(user).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });

   }


   
  }
}

