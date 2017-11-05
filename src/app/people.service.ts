import { Injectable }                              from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//model
import { Person } from './person';

const PEOPLE: Person[] = [
  {id: 1, name: "Luke Skywalker", height: 177, weight: 70},
  {id: 2, name: "Darth Vader",    height: 200, weight: 100},
  {id: 3, name: "Han Solo",       height: 185, weight: 85}
];


@Injectable()
export class PeopleService {
  //Api address we will pull from. 
  private baseUrl: string = 'https://swapi.co/api';

  //ctor injected with Http Service.
  constructor(private http: Http) { }  

  getAll(): Observable<Person[]> {
    let people$ = this.http
      .get(`${this.baseUrl}/people`, {headers: this.getHeaders()})
      .map(mapPersons)
      .catch(handleError);
      return people$;
  }

  private getHeaders() {
    //Headers need to be done because firefox will request 
    //text/html instead of application/json
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  get(id: number): Observable<Person> {
    let person$ = this.http
      .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
      .map(mapPerson)
      .catch(handleError);
      return person$;
  }

  save(person: Person): Observable<Response> {
    //this wont work because api is read only but it is an example 
    return this.http
               .put(`${this.baseUrl}/people/${person.id}`,
                JSON.stringify(person), 
                {headers: this.getHeaders()});
  }
}

/* Defines how a group of persons will be mapped by Observable<Person[]> response. */
function mapPersons(response: Response): Person[] {
  //throw new Error('ups! Force choke!');
  //The api has a results property. 
  return response.json().results.map(toPerson);
}

/* This defines how a single person will be mapped to an Observable<Person> response */
function mapPerson(response: Response) {
  return toPerson(response.json());
}

function toPerson(r: any): Person {
  let person = <Person>({
    id: extractId(r),
    url: r.url,
    name: r.name,
    weight: Number.parseInt(r.mass),
    height: Number.parseInt(r.height),
  });
  console.log("Parsed person: ", person);
  return person;
}

//this is just to utilize the id in our person interface.
//So i don't have to change the app.
function extractId(personData: any) {
  let extractedId = personData.url.replace('https://swapi.co/api/people/', '').replace('/', '');
  return parseInt(extractedId);
}

//Error handling function 
function handleError(error: any) {
  let errorMsg = error.message || `There was a problem with our hyper drive device and we couldn't retrieve your data!`;
  console.error(errorMsg);

  //throw an application level error. 
  return Observable.throw(errorMsg);
}
