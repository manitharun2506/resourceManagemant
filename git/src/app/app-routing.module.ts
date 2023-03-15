import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManagerProfileComponent } from './manager-profile/manager-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"userLogin",component:UserLoginComponent},
  {path:"userProfile",component:UserProfileComponent},
  {path:"managerProfile",component:ManagerProfileComponent},
  {path:"admin",component:AdminProfileComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
