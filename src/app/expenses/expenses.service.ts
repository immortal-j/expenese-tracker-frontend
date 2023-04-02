import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { User } from '../shared/user.model';
import { Expense } from './expense.model';
@Injectable()
export class ExpenseService implements OnInit {
  expenseListChanged = new EventEmitter<Expense[]>();
  totalspentChanged = new EventEmitter<number>();
  user: User;
  private totalSpent: number = 10;
  private expenses: Expense[] = [];
  constructor(
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {}
  getExpenses() {
    this.user = this.loginService.getUser();
    this.http
      .post('http://localhost:3000/expenses/getexpenses', {
        email: this.user.email,
      })
      .subscribe({
        next: (data: any) => {
          this.expenses = data.map(
            (item: any) =>
              new Expense(item.amount, item.title, item.description)
          );
          console.log("HELLO!!!");
          return this.expenses.slice();
        },
        error: (err) => {
          console.log(err);
          return this.expenses;
        },
      });
    return this.expenses;
  }
  getExpense(id: number) {
    return this.expenses[id];
  }
  getTotalSpent() {
    return this.totalSpent;
  }
  addExpense(expense: Expense) {
    this.expenses.push(expense);
    console.log(this.expenses);
    this.totalSpent += expense.amount;
    this.expenseListChanged.emit(this.expenses.slice());
    this.totalspentChanged.emit(this.totalSpent);
    this.router.navigate(['/expenses']);
  }
  editExpense(expense: Expense, index: number) {
    this.totalSpent += expense.amount - this.expenses[index].amount;

    this.expenses[index] = expense;
    this.expenseListChanged.emit(this.expenses.slice());
    this.totalspentChanged.emit(this.totalSpent);
    this.router.navigate(['/expenses']);
  }
  deleteExpense(index: number) {
    this.totalSpent -= this.expenses[index].amount;
    this.expenses.splice(index, 1);
    this.expenseListChanged.emit(this.expenses.slice());
    this.totalspentChanged.emit(this.totalSpent);
    this.router.navigate(['/expenses']);
  }
}
