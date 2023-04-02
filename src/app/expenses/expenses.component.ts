import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndPointsService } from '../shared/endPoints.service';
import { StoreService } from '../shared/store.service';
import { User } from '../shared/user.model';
import { Group } from '../split/group.model';
import { ExpenseService } from './expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  providers: [ExpenseService],
})
export class ExpensesComponent implements OnInit {
  showSummary: boolean = false;
  url: string;
  user:User;
  groups:Group[];
  lastpartUrl: any;
  constructor(private storeService:StoreService,private endPointsService:EndPointsService,private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.user = this.storeService.getUser();
    this.url = this.router.url;
    this.lastpartUrl = this.url.split('/');
    this.lastpartUrl = this.lastpartUrl[this.lastpartUrl.length - 2];
    if (
      this.router.url == '/expenses/new' ||
      this.router.url == '/expenses/' + this.lastpartUrl + '/edit'
    ) {
      this.showSummary = true;
    } else {
      this.showSummary = false;
    }
    this.router.events.subscribe((val) => {
      if (
        this.router.url == '/expenses/new' ||
        this.router.url === '/expenses/' + this.lastpartUrl + '/edit'
      ) {
        this.showSummary = true;
      } else {
        this.showSummary = false;
      }
    });
    this.endPointsService.getGroups(<string>this.user.email).subscribe({
          next: (data)=>{
            console.log(data);
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
          error: (err) => {console.log(err);}
        })
      }
}
