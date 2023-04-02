import {
  Component,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndPointsService } from '../shared/endPoints.service';
import { StoreService } from '../shared/store.service';
import { User } from '../shared/user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  obj: User;
  signinForm: FormGroup;
  signupForm: FormGroup;
  signin: boolean = true;
  constructor(private endPointService:EndPointsService,private storeService:StoreService,private router: Router) {}
  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null),
    });
    this.signupForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      name: new FormControl(null),
      password: new FormControl(null),
    });
  }
  handleclicksignin() {
    this.signin = true;
  }
  handleclicksignup() {
    this.signin = false;
  }
  onsignin() {
    this.endPointService.onsignin(this.signinForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.storeService.setUser(new User({_id: data["_id"],name:data["name"], email: data["email"], budget: data["budget"],totalspent: data["totalspent"]}))
        this.router.navigate(['/expenses']);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  onsignup() {
    console.log("hello");
    this.endPointService.onsignup(this.signupForm.value).subscribe({
      next: (data) => {
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
