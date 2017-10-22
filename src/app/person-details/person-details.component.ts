import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }           from '@angular/router';

//models
import { Person } from '../person';

//services 
import { PeopleService } from "../people.service";

@Component({
  selector: 'app-person-details',
  template: `
  <section *ngIf="person">
    <h2>You selected: {{person.name}}</h2>
    <h3>Description</h3>
    <p>
      {{person.name}} weighs {{person.weight}}lbs and is {{person.height}}cms
    </p>
  </section>

  <button (click)="gotoPeoplesList()">Back to character list</button>
  `,
  styles: []
})
export class PersonDetailsComponent implements OnInit {

  person: Person;
  sub:    any;

  constructor(private peopleService: PeopleService, 
              private route:         ActivatedRoute,
              private router:        Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      this.person = this.peopleService.get(id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoPeoplesList() {
    // let link = ['/persons'];
    // this.router.navigate(link);
    //the above is to demonstrate browsing, but using below is more normal or sane. 
    window.history.back();
  }
}
