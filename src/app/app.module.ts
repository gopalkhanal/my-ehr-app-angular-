import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import {ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { PatientService } from './patient/patient.service';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddpatientDetailsComponent } from './addpatientdescription/addpatientdescription.component';
import { PatientModule } from './patient/patient.module';
import { UpdatepatientdescriptionComponent } from './updatepatientdescription/updatepatientdescription.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    NavbarComponent,
    WelcomeComponent,
    AddpatientDetailsComponent,
    UpdatepatientdescriptionComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, PatientModule, ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'patient', component: PatientComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'addpatientdescription', component: AddpatientDetailsComponent },
      { path: 'patient/:id', component: UpdatepatientdescriptionComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }

    ])
  ],
  providers: [PatientService],
  bootstrap: [AppComponent, WelcomeComponent]
})
export class AppModule { }
