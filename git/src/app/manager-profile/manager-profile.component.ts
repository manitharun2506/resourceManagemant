import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit{
  managerData:any;

  constructor(private router:Router,private http:UserService){

  }

  
  ngOnInit(): void {
    if(sessionStorage.getItem('manager')){
      this.managerData=JSON.parse(sessionStorage.getItem('manager')||'')
    }
    else{
      this.router.navigate(['/login'])
      alert("please login first")
    }
  }

  showdata: boolean = false;

  data:any;

  submit(event:any){
    if(this.showdata===true){
      this.showdata=false
    }
    this.http.getUsersBySkills(event.target.value).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.data=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }


  logOut(){
    sessionStorage.clear()
    alert("successfully logged off")
    this.router.navigate(['/login'])
  }

  sendRequest(profile:any){
    let body={
      manager:this.managerData,
      profile:profile
    }
    console.log(body)
    this.http.postProfileRequest(body).subscribe({
      next:(res:any)=>{
        console.log(res)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

}