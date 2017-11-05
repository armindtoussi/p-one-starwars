import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';

//services & models
import { PeopleService } from '../people.service';
import { Person }        from '../person';


@Component({
  selector: 'app-people-list',
  template: `
    <section *ngIf="isLoading && !errorMessage">
      Loading our hyperdrives! Retrieving data...
    </section>
    <ul>
      <li *ngFor="let person of people">
        <a href='#' [routerLink]="['/persons', person.id]">{{person.name}}</a>
      </li>
    </ul>
    <section *ngIf="errorMessage">
      {{errorMessage}}
    </section>
  `,
  styleUrls: ['./people-list.component.scss']
})

export class PeopleListComponent implements OnInit {

  people:     Person[] = [];
  errorMessage: string = '';
  isLoading:   boolean = true;

  constructor(private _peopleService: PeopleService) { }

  ngOnInit() { 
    this._peopleService
        .getAll() //second arg of the subscribe method handles errors. 
        .subscribe(p => this.people       = p,
                   e => this.errorMessage = e, //second one is error handling path. 
                  () => this.isLoading    = false); 
  }
}
