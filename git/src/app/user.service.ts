import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  backendUrl = 'http://192.168.0.104:8080/api/';

  createOrRegister(body: any) {
    return this.http.post(this.backendUrl + 'profiles', body);
  }

  updateProfile(body: any) {
    return this.http.put(this.backendUrl + 'profiles/' + body.id, body);
  }

  loginprofile(body: any) {
    return this.http.post(
      this.backendUrl +
        `profiles/login?email=${body.email}&password=${body.password}`,
      {}
    );
  }

  createOrRegisterManager(body: any) {
    //managers
    return this.http.post(this.backendUrl + 'managers', body);
  }

  loginManager(body: any) {
    return this.http.post(
      this.backendUrl +
        `managers/login?email=${body.email}&password=${body.password}`,
      {}
    );
  }

  getUsersBySkills(params: any) {
    return this.http.get(this.backendUrl + 'profiles/skill/' + params);
  }

  getAllProfilePendingRequests(){
    return this.http.get(this.backendUrl + 'profile-requests/status/PENDING');

  }

  postProfileRequest(body: any) {
    //profile-requests/status/PENDING
    return this.http.post(this.backendUrl + 'profile-requests', body);
  }


  AcceptRequest(body:any){
    return this.http.put(this.backendUrl + 'profile-requests'+body.id,body);

  }
}
