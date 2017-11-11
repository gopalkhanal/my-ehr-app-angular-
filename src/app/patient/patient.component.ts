import { Component, OnInit } from '@angular/core';
import { IPatient } from './patient.interface';
import { PatientService } from "./patient.service";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  private patient: IPatient;

  currentPatient: IPatient;

  patients: IPatient[] = [{
    'id': null,
    'firstName': "",
    'lastName': "",
    'gender': "",
    'dob': "",
    'addressVO': { 'street': "", 'city': "", 'state': "", 'zip': null },
    'contactInfoVO': { 'email': "", 'homePhone': null, 'cellPhone': null, 'methodOfContact': "" },
    'patientCode': null,
    'patientStatus': "",
    'ssn': "",
    'dateCreated': "",
    'dateModified': "",

    'patientAllergyVO': [{
      'patientAllergyId': null,
      'allergyId': null,
      'patientId': null,
      'dateCreated': ""
    }]
  }];

  year: string;
  day: string;
  month: string;

  name: String;
  dob: String;
  gender: String;
  zip: number;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    //this.patientService.currentPatient.subscribe(patient => this.patient = patient)
  }

  title = 'Elctronic Health Record';

  addPatientButton: boolean = false;
  showTable: boolean = false;
  //private searchButtonClicked: boolean = false;

  show = false;

  // Show() {
  //   this.searchButtonClicked = true;
  //   this.addPatientButton = true;//(this.patients.length == 0);
  // }

  // Show table
  display(): void {
    console.log(this.patients.length);


    if (this.patients.length  != 0) {
      this.addPatientButton = false;
      this.showTable = true;
      console.log('records appears');
    }
    else {
      this.addPatientButton = true;
      this.showTable = false;
      console.log('Add appears');
    }
  }

  reset() {
    this.showTable = false;
  }

  getPatients() {
   
    this.dob = this.year + "-" + this.month + "-" + this.day;
    var param = this.name && this.dob && this.gender && this.zip;
    if (param != null) {
      this.patientService.getPatients(this.name, this.dob, this.gender, this.zip).subscribe(data => {this.patients = data;
     this.display();});
    }
    else {
      alert("Fill the form above to get the result.. or go to add..");
      this.addPatientButton=true;
    }
  }

  addPatients(): void {

    this.patientService.addPatient(this.currentPatient);
  }

}