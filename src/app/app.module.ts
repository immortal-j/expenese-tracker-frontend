import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { ExpenseDetailsComponent } from './expenses/expense-details/expense-details.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ExpenseEditComponent } from './expenses/expense-edit/expense-edit.component';
import { ExpensesItemComponent } from './expenses/expenses-list/expenses-item/expenses-item.component';
import { AppRoutingModule } from './app-routing.module';
import { ExpenseSummaryComponent } from './expenses/expense-summary/expense-summary.component';
import { ExpenseNewComponent } from './expenses/expense-new/expense-new.component';
import { ExpenseService } from './expenses/expenses.service';
import { SplitComponent } from './split/split.component';
import { GroupListComponent } from './split/group-list/group-list.component';
import { GroupDetailComponent } from './split/group-detail/group-detail.component';
import { GroupItemComponent } from './split/group-list/group-item/group-item.component';
import { LoginService } from './login/login.service';
import {HttpClientModule} from '@angular/common/http';
import { EndPointsService } from './shared/endPoints.service';
import { StoreService } from './shared/store.service';
import { SplitExpenseComponent } from './split/split-expense/split-expense.component';


@NgModule({
  declarations: [AppComponent, HeaderComponent, ExpensesComponent, ExpensesListComponent, ExpenseDetailsComponent, ProfileComponent, LoginComponent, ExpenseEditComponent, ExpensesItemComponent, ExpenseSummaryComponent, ExpenseNewComponent, SplitComponent, GroupListComponent, GroupDetailComponent, GroupItemComponent, SplitExpenseComponent],
  imports: [BrowserModule, ReactiveFormsModule,AppRoutingModule,HttpClientModule],
  providers: [LoginService,EndPointsService,StoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
