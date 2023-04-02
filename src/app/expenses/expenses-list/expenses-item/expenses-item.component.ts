import { Component, Input } from '@angular/core';
import { Expense } from '../../expense.model';

@Component({
  selector: 'app-expenses-item',
  templateUrl: './expenses-item.component.html',
  styleUrls: ['./expenses-item.component.css']
})
export class ExpensesItemComponent {
  @Input() expenseitem:Expense;
  @Input() expensenumber:number;
}
