import { Component, OnInit } from '@angular/core';

//services & models
import { PeopleService } from '../people.service';
import { Person }        from '../person';


@Component({
  selector: 'app-people-list',
  template: `
    <ul>
      <li *ngFor="let person of people">
        <a href='#' [routerLink]="['/persons', person.id]">{{person.name}}</a>
      </li>
    </ul>
  `,
  styleUrls: ['./people-list.component.scss']
})

export class PeopleListComponent implements OnInit {

  people: Person[] = [];
  selectedPerson: Person;

  constructor(private _peopleService: PeopleService) { }

  ngOnInit() { 
    this.people = this._peopleService.getAll();
  }

  selectPerson(person) {
    this.selectedPerson = person;
  }

}
