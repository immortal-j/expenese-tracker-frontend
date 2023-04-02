import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { deleteModel } from 'mongoose';
import { Observable } from 'rxjs';
import { Expense } from '../expenses/expense.model';
import { User } from './user.model';
type basicobject = {
  [key: string]: string | number | null;
};
@Injectable()
export class EndPointsService {
  url: string = 'https://expense-tracker-backend-5hhw.onrender.com';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  onsignin(userdata: {
    email: string;
    password: string;
  }): Observable<basicobject> {
    return this.http.post<basicobject>(
      this.url+'/users/login',
      userdata
    );
  }

  onsignup(userdata: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(this.url+'/users/signup', userdata);
  }
  getUserData(email: string): Observable<any> {
    return this.http.post<any>(this.url+'/users/getuser', {
      email: email,
    });
  }
  setUserData(
    email: string,
    name: string,
    budget: number,
    password: string
  ): Observable<any> {
    return this.http.post<any>(this.url+'/users/edituser', {
      email: email,
      name: name,
      password: password,
      budget: budget,
    });
  }

  getExpenses(userdata: { email: string }): Observable<any> {
    return this.http.post<any>(
      this.url+'/expenses/getexpenses',
      userdata
    );
  }

  addExpense(email: string, expense: Expense): Observable<basicobject> {
    return this.http.post<basicobject>(
      this.url+'/expenses/addexpense',
      { email: email, expense: expense }
    );
  }
  editExpense(
    email: string,
    expense: Expense,
    index: number
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      this.url+'/expenses/editexpense',
      { email: email, expense: expense, index: index }
    );
  }
  deleteExpense(email: string, index: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      this.url+'/expenses/deleteexpense',
      { email: email, index: index }
    );
  }
  getTotalSpent(email: string): Observable<any> {
    return this.http.post<any>(this.url+'/expenses/gettotalspent', {
      email: email,
    });
  }
  addGroup(email: string, groupname: string): Observable<any> {
    return this.http.post<any>(this.url+'/group/addgroup', {
      email: email,
      name: groupname,
    });
  }
  getGroups(email: string): Observable<any> {
    return this.http.post<any>(this.url+'/group/getgroups', {
      email: email,
    });
  }
  addGroupMember(
    email: string,
    newmembermail: string,
    groupid: string
  ): Observable<any> {
    return this.http.post<any>(this.url+'/group/addgroupmember', {
      email: email,
      newmembermail: newmembermail,
      groupid: groupid,
    });
  }
  addGroupExpense(
    email: string,
    groupid: string,
    amount: number
  ): Observable<any> {
    return this.http.post<any>(this.url+'/group/addgroupexpense', {
      email: email,
      amount: amount,
      groupid: groupid,
    });
  }
}
