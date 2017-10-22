//modules
import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent }           from './app.component';
import { PeopleListComponent }    from './people-list/people-list.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

//services
import { PeopleService } from './people.service';


@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PersonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})

export class AppModule { }
