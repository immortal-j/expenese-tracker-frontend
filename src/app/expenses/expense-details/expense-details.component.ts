import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndPointsService } from 'src/app/shared/endPoints.service';
import { StoreService } from 'src/app/shared/store.service';
import { User } from 'src/app/shared/user.model';
import { Group } from 'src/app/split/group.model';
import { Expense } from '../expense.model';
import { ExpenseService } from '../expenses.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css'],
})
export class ExpenseDetailsComponent implements OnInit {
  selectedExpense: Expense;
  index: number;
  user: User;
  groups:Group[];
  expenses: Expense[];
  constructor(
    private endPointsService: EndPointsService,
    private storeService: StoreService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.groups = this.storeService.getGroups();
    this.user = this.storeService.getUser();
    this.route.params.subscribe((params) => {
      this.index = +params['id'];
      this.selectedExpense = this.storeService.getExpense(this.index);
      console.log(this.selectedExpense);
    });
    this.storeService.groupsChanged.subscribe(data=>{
      this.groups=data;
    })
  }
  onDelete() {
    this.endPointsService
      .deleteExpense(<string>this.user.email, this.index)
      .subscribe({
        next: () => {
          this.endPointsService
            .getExpenses({ email: <string>this.user.email })
            .subscribe({
              next: (data) => {
                this.expenses = data.map(
                  (item: any) =>
                    new Expense(item.amount, item.title, item.description)
                );
                this.storeService.setExpenses(this.expenses);
                this.endPointsService
                  .getTotalSpent(<string>this.user.email)
                  .subscribe({
                    next: (data) => {
                      this.storeService.setTotalSpent(data.totalspent);
                    },
                    error: (err) => {
                      console.log(err);
                    },
                  });
              },
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  splitExpense(index:number){
    this.endPointsService.splitExpense(<string>this.user.email,this.groups[index].groupid,index).subscribe({
      next:(data)=>{
        this.endPointsService.getGroups(<string>this.user.email).subscribe({
          next: (data)=>{
          this.groups = data.map(
            (group: any) =>
              new Group(
                group._id,
                group.name,
                group.members,
                group.transactions
              )
          );
          this.storeService.setGroups(this.groups);
          this.router.navigate(['/split']);
          },
          error: (err) => {}
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
