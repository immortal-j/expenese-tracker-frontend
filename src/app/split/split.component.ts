import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { groupService } from './groups.service';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css'],
  providers:[groupService]
})
export class SplitComponent implements OnInit {
  showGroupDetails = false;
  url:string;
  constructor(private router:Router){}
  ngOnInit(): void{
    
  }
}
