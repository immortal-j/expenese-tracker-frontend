import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  lastpartUrl: any;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
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
  }
}
