import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  showlogout: boolean = false;
  constructor(private storeService:StoreService,private router:Router){};
  ngOnInit(): void {
    if(this.storeService.getUser()!=null){
      this.showlogout=true;
    }
    if(this.storeService.getLoggedin()){
      this.showlogout=true;
    }
    else{
      this.showlogout=false;
    }
 
    this.storeService.userChanged.subscribe(user =>{
      if(user==null){
        this.showlogout=false;
      }
      else {
        this.showlogout=true;
      }
    });
    this.storeService.loggedinChanged.subscribe(status=>{
      if(status)
      {
        this.showlogout=true;
      }
      else{
        this.showlogout=false;
      }
    })
  }
  handleLogout(): void {
    this.storeService.setLoggedin(false);
    this.router.navigate(['/login']);
  }
}
