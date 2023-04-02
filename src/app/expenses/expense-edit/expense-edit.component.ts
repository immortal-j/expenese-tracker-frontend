import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EndPointsService } from 'src/app/shared/endPoints.service';
import { StoreService } from 'src/app/shared/store.service';
import { User } from 'src/app/shared/user.model';
import { Expense } from '../expense.model';
import { ExpenseService } from '../expenses.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css'],
})
export class ExpenseEditComponent implements OnInit {
  user:User;
  editExpenseForm: FormGroup;
  expense:Expense;
  expenses:Expense[];
  index:number;
  constructor(private endPointsService:EndPointsService,private storeService:StoreService,private expenseService: ExpenseService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.user=this.storeService.getUser();
    this.editExpenseForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });
    this.route.params.subscribe(params =>{
      this.index=+params['id'];
      this.expense=this.storeService.getExpense(+params['id'])
       this.editExpenseForm.patchValue({
         title:this.expense.title ,
         description: this.expense.title,
         amount: this.expense.amount,
       });
    })
   
  }
  onEdit() {
    this.endPointsService.editExpense(
      <string>this.user.email,
      new Expense(
        this.editExpenseForm.value.amount,
        this.editExpenseForm.value.title,
        this.editExpenseForm.value.description
      ),this.index
    ).subscribe({
      next:(data)=>{
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
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
