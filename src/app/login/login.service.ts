import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';
type basicobject = {
  [key: string]: string | number
}
@Injectable()

export class LoginService implements OnInit {
  user: User;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  onsignin(userdata: { email: string; password: string }):Observable<basicobject> {
    return this.http.post<basicobject>('http://localhost:3000/users/login', userdata)
  }
  

  onsignup(userdata: { name: string; email: string; password: string }): void {
     this.http.post('http://localhost:3000/users/signup', userdata).subscribe({
       next: (data) => {
         console.log(data);
       },
       error: (err) => {
         console.log(err);
       },
     });
  }

  getUser():User{
    return this.user;
  }
}
