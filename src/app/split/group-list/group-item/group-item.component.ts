import { Component, Input } from '@angular/core';
import { Group } from '../../group.model';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent {
 @Input() group:Group;
 @Input() index:number;

}
