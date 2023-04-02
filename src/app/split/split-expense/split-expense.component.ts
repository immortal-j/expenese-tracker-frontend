import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/expenses/expense.model';
import { EndPointsService } from 'src/app/shared/endPoints.service';
import { StoreService } from 'src/app/shared/store.service';
import { User } from 'src/app/shared/user.model';
import { Group } from '../group.model';

@Component({
  selector: 'app-split-expense',
  templateUrl: './split-expense.component.html',
  styleUrls: ['./split-expense.component.css'],
})
export class SplitExpenseComponent  implements OnInit{
  user: User;
  groups:Group[];
  index:number;
  newExpenseForm: FormGroup;
  constructor(
    private storeService: StoreService,
    private endPointsService: EndPointsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.newExpenseForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });
    this.route.params.subscribe((params) => {
      this.index = +params['id'];
    });
    this.user = this.storeService.getUser();
  }
  onAdd() {
    this.endPointsService
      .addGroupExpense(
        <string>this.user.email,
        <string>this.storeService.getGroup(this.index).groupid,
       this.newExpenseForm.value.amount,
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.endPointsService
            .getGroups(<string>this.user.email )
            .subscribe({
              next: (data) => {
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
                  this.router.navigate(['/split/' + this.index]);
              },
            });
         
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
