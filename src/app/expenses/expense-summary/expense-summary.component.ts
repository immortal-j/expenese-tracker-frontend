import { Component, OnInit } from '@angular/core';
import { EndPointsService } from 'src/app/shared/endPoints.service';
import { StoreService } from 'src/app/shared/store.service';
import { User } from 'src/app/shared/user.model';
import { ExpenseService } from '../expenses.service';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css']
})
export class ExpenseSummaryComponent implements OnInit{
  user:User;
  totalSpent:number;
  constructor(private storeService:StoreService,private endPointService:EndPointsService){

  };
  ngOnInit(): void {
    this.user=this.storeService.getUser();
    this.endPointService.getTotalSpent(<string>this.user.email).subscribe({
      next:(data)=>{
        console.log(data);
        this.totalSpent=data.totalspent;
        console.log(this.totalSpent);
        this.storeService.setTotalSpent(data.totalspent);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.storeService.userChanged.subscribe((data)=>{
      this.user=data;
    })
    this.storeService.totalspentchanged.subscribe(totalSpent=>{
      this.totalSpent = totalSpent;
    })
  }

}
