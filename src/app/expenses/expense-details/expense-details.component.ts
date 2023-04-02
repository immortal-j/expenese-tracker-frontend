import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndPointsService } from 'src/app/shared/endPoints.service';
import { StoreService } from 'src/app/shared/store.service';
import { User } from 'src/app/shared/user.model';
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
  expenses: Expense[];
  constructor(
    private endPointsService: EndPointsService,
    private storeService: StoreService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.user = this.storeService.getUser();
    this.route.params.subscribe((params) => {
      this.index = +params['id'];
      this.selectedExpense = this.storeService.getExpense(this.index);
    });
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
}
