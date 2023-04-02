import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EndPointsService } from 'src/app/shared/endPoints.service';
import { StoreService } from 'src/app/shared/store.service';
import { User } from 'src/app/shared/user.model';
import { Group } from '../group.model';
import { groupService } from '../groups.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  groups: Group[];
  user: User;
  addGroupForm: FormGroup;
  constructor(
    private endPointsService: EndPointsService,
    private storeService: StoreService,
    private groupService: groupService
  ) {}
  ngOnInit(): void {
    this.user = this.storeService.getUser();
    this.groups = this.groupService.getGroups();
     this.addGroupForm = new FormGroup({
       groupname: new FormControl(null, Validators.required),
     });
    this.endPointsService.getGroups(<string>this.user.email).subscribe({
      next: (data) => {
        this.groups = data.map(
          (group: any) =>
            new Group(group._id, group.name, group.members, group.transactions)
        );
        this.storeService.setGroups(this.groups);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.storeService.groupsChanged.subscribe((groups) => {
      this.groups = groups;
    });
  }
  addGroup() {
    this.endPointsService.addGroup(<string>this.user.email,this.addGroupForm.value.groupname).subscribe({
      next: ()=>{
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
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
