import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EndPointsService } from 'src/app/shared/endPoints.service';
import { StoreService } from 'src/app/shared/store.service';
import { User } from 'src/app/shared/user.model';
import { Expense } from '../expense.model';
import { ExpenseService } from '../expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css'],
})
export class ExpensesListComponent implements OnInit {
  user: User;
  expenses: Expense[] = [];
  constructor(
    private endPointsService: EndPointsService,
    private storeService: StoreService,
    private expenseService: ExpenseService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.user = this.storeService.getUser();
    this.endPointsService
      .getExpenses({ email: <string>this.user.email })
      .subscribe({
        next: (data) => {
          this.expenses = data.map(
            (item: any) =>
              new Expense(item.amount, item.title, item.description)
          );
          this.storeService.setExpenses(this.expenses);
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.storeService.expensesChanged.subscribe((expenses) => {
      this.expenses = expenses;
    });
  }
  addNew() {
    this.router.navigate(['/expenses/new']);
  }
}
