import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { EndPointsService } from '../shared/endPoints.service';
import { StoreService } from '../shared/store.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData:User;
  profileForm:FormGroup;
  constructor(private storeService:StoreService,private endPointsService:EndPointsService,private loginService:LoginService,private router: Router){}
  ngOnInit(): void{
    this.profileForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      budget:new FormControl(null,[Validators.required]),
      password:new FormControl(null,[Validators.required])
    });
    this.userData=this.storeService.getUser();
    this.profileForm.patchValue({name:this.userData.name,email:this.userData.email,budget:this.userData.budget});
    this.storeService.userChanged.subscribe(data =>{
      this.userData=data;
    })
  }
  editUserData(){
      this.endPointsService.setUserData(<string>this.userData.email,this.profileForm.value.name,this.profileForm.value.budget,this.profileForm.value.password).subscribe({
        next:(data)=>{
          this.endPointsService.getUserData(<string>this.userData.email).subscribe({
            next:(data)=>{
              console.log(data);
              this.storeService.setUser(new User({_id:null,name:data.name,email:data.email,budget:data.budget,totalspent:null,date:null}));
              this.router.navigate(['/expenses']);
            },
            error:(err)=>{
              console.log(err);
            }
          })
          
        },
        error:(error)=>{console.log(error);}
      })
  }
}
