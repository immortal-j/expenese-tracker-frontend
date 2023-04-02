import { EventEmitter, Injectable, Output } from "@angular/core";
import { Expense } from "../expenses/expense.model";
import { Group } from "../split/group.model";
import { User } from "./user.model";
@Injectable()
export class StoreService{
    @Output() expensesChanged = new EventEmitter<Expense[]>();
    @Output() totalspentchanged = new EventEmitter<number>();
    @Output() groupsChanged = new EventEmitter<Group[]>();
    @Output() userChanged = new EventEmitter<User>();
    @Output() loggedinChanged = new EventEmitter<boolean>();
    user:User;
    loggedin:boolean = false;
    expenses:Expense[];
    groups:Group[];
    totalspent:number;
    setLoggedin(status:boolean):void{
        this.loggedin = status;
        this.loggedinChanged.emit(this.loggedin);
    }
    getLoggedin():boolean{
        return this.loggedin;
    }
    setTotalSpent(amount:number){
        this.totalspent = amount;
        console.log(this.totalspent);
        this.totalspentchanged.emit(this.totalspent);
    }
    setExpenses(expenses:Expense[]){
        this.expenses = expenses;
        this.expensesChanged.emit(expenses);
        this.totalspentchanged.emit(this.totalspent);
    }
    getExpenses(){

    }
    getExpense(index:number){
        return this.expenses[index];
    }
    setUser(user:User){
        this.user = user;
        this.userChanged.emit(this.user);
    }
    getUser(){
        return this.user;
    }
    setGroups(groups:Group[]){
        this.groups = groups;
        this.groupsChanged.emit(this.groups);
    }
    getGroups(){
        console.log(this.groups);
        return this.groups.slice();
    }
    getGroup(index:number){
        return this.groups[index];
    }
}