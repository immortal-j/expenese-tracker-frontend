import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseDetailsComponent } from './expenses/expense-details/expense-details.component';
import { ExpenseEditComponent } from './expenses/expense-edit/expense-edit.component';
import { ExpenseNewComponent } from './expenses/expense-new/expense-new.component';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { GroupDetailComponent } from './split/group-detail/group-detail.component';
import { SplitExpenseComponent } from './split/split-expense/split-expense.component';
import { SplitComponent } from './split/split.component';
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'split',
    component: SplitComponent,
    children: [
      {path: ':id/new',component:SplitExpenseComponent},
      {path: ':id',component:GroupDetailComponent}
    ]
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
    children: [
      { path: 'new', component: ExpenseNewComponent },
      { path: ':id/edit', component: ExpenseEditComponent },
      { path: ':id', component: ExpenseDetailsComponent },
    ],
  },
  {
    path:'login',
    component: LoginComponent,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
