import { Injectable, OnInit } from '@angular/core';
import { Group } from './group.model';
@Injectable()
export class groupService implements OnInit {
  groups: Group[] = [
   
  ];
  constructor() {}
  ngOnInit(): void {
  }
  getGroups(): Group[] {
    return this.groups.slice();
  }
  getGroup(index: number): Group {
    console.log(this.groups[index]);
    return this.groups[index];
  }
  addMember(member: string): void {}
}
