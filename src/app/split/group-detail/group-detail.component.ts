import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EndPointsService } from 'src/app/shared/endPoints.service';
import { StoreService } from 'src/app/shared/store.service';
import { User } from 'src/app/shared/user.model';
import { Group } from '../group.model';
import { groupService } from '../groups.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css'],
})
export class GroupDetailComponent implements OnInit {
  user: User;
  index: number;
  group: Group;
  groups:Group[];
  userTransactions: any;
  newMemberForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private endPointsService: EndPointsService
  ) {}
  ngOnInit(): void {
    this.user = this.storeService.getUser();
    this.newMemberForm = new FormGroup({
      newMember: new FormControl(null, [Validators.required, Validators.email]),
    });
   
    this.route.params.subscribe((params) => {
      this.index = +params['id'];
      this.group = this.storeService.getGroup(this.index);
      console.log(this.group);
      for (let i = 0; i < this.group.transactions.length; i++) {
        if (this.group.transactions[i].email == this.user.email) {
          this.userTransactions = this.group.transactions[i].receivers;
          break;
        }
      }
    });
  }
  addMember() {
    this.endPointsService
      .addGroupMember(
        <string>this.user.email,
        this.newMemberForm.value.newMember,
        this.group.groupid
      )
      .subscribe({
        next: () => {
          console.log('Added Member Successfully');
          this.endPointsService.getGroups(<string>this.user.email).subscribe({
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
              this.router.navigate(['/split']);
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  addExpense(){

  }
}
