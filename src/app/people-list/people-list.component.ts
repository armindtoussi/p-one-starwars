import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';

//services & models
import { PeopleService } from '../people.service';
import { Person }        from '../person';


@Component({
  selector: 'app-people-list',
  template: `
    <ul>
      <li *ngFor="let person of people | async">
        <a href='#' [routerLink]="['/persons', person.id]">{{person.name}}</a>
      </li>
    </ul>
  `,
  styleUrls: ['./people-list.component.scss']
})

export class PeopleListComponent implements OnInit {

  people: Observable<Person[]>;
  errorMessage: string = '';
  isLoading:   boolean = true;

  constructor(private _peopleService: PeopleService) { }

  ngOnInit() { 
    this.people = this._peopleService.getAll(); 
  }
}
