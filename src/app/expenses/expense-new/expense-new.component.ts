import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../expenses.service';
import { Expense } from '../expense.model';
import { StoreService } from 'src/app/shared/store.service';
import { EndPointsService } from 'src/app/shared/endPoints.service';
import { User } from 'src/app/shared/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-expense-new',
  templateUrl: './expense-new.component.html',
  styleUrls: ['./expense-new.component.css'],
})
export class ExpenseNewComponent implements OnInit {
  user: User;
  expenses: Expense[];
  newExpenseForm: FormGroup;
  constructor(
    private storeService: StoreService,
    private endPointsService: EndPointsService,
    private expenseService: ExpenseService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.newExpenseForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });
    this.user = this.storeService.getUser();
  }
  onAdd() {
    this.endPointsService
      .addExpense(
        <string>this.user.email,
        new Expense(
          this.newExpenseForm.value.amount,
          this.newExpenseForm.value.title,
          this.newExpenseForm.value.description,
          null,
        )
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.endPointsService
            .getExpenses({ email: <string>this.user.email })
            .subscribe({
              next: (data) => {
                this.expenses = data.map(
                  (item: any) =>
                    new Expense(item.amount, item.title, item.description,null)
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
          this.router.navigate(['/expenses']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
