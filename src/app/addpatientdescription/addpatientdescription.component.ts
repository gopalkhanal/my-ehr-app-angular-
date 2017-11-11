import { Component, OnInit } from '@angular/core';
import { IPatient } from './../patient/patient.interface';
import { PatientService } from "./../patient/patient.service";
import { IAllergydetails } from '../updatepatientdescription/allergydetails.interface';
import { IPatientallergy } from '../updatepatientdescription/patientallergy.interface';

@Component({
  selector: 'app-addpatientdescription',
  templateUrl: './addpatientdescription.component.html',
  styleUrls: ['./addpatientdescription.component.css']
})
export class AddpatientDetailsComponent implements OnInit {

  isAdd = false;

  private key: String;
  private event: KeyboardEvent;

  showPatientAllergies = false;

  allergyCode: number;
  allergyDescription: string



  patients: IPatient = {
    'id': null,
    'firstName': "",
    'lastName': "",
    'gender': "",
    'dob': null,
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
  }

  currentAllergyDetails: IAllergydetails = {
    'allergyId': null,
    'allergyCode': null,
    'allergyDescription': ""
  }

  currentPatientAllergy: IPatientallergy = {
    'patientAllergyId': null,
    'allergyId': null,
    'patientId': null,
    'dateCreated': ""
  }

  allergyDetailsList: AllergyDetails[] = [];
  allDetailsList: AllergyDetails;


  constructor(private patientService: PatientService) { }

  ngOnInit() {

  }

  showForm(): void {
    this.isAdd = !this.isAdd;
  }


  // Triggers when user enter any number in PatientCode's input field...
  private onKeyPress(event: KeyboardEvent): void {
    this.key = event.key;

    if (this.key == "Enter") {
      this.searchAllergyDetails(this.currentAllergyDetails.allergyCode);
      console.log(this.currentAllergyDetails.allergyCode);
    }
  }

  // Search allergy from AllergyDescription table...
  searchAllergyDetails(id: number): void {
    this.patientService.getAllergyDetails(id).subscribe((data) => {
      this.currentAllergyDetails = data
      this.allergyDescription = this.currentAllergyDetails.allergyDescription;
      this.allergyCode = this.currentAllergyDetails.allergyCode;
    });
  }

  // Method to display PatientAllergy
  patientAllergy() {
    this.allDetailsList = new AllergyDetails();
    this.allDetailsList.allergyCode = this.allergyCode;
    this.allDetailsList.allergyDescription = this.allergyDescription;
    this.allDetailsList.allergyId = this.currentAllergyDetails.allergyId;

    this.allergyDetailsList.push(this.allDetailsList);
    console.log(this.allDetailsList);

    if (this.allergyDetailsList && this.allergyDetailsList.length) {
      this.showPatientAllergies = true;
    }
    else {
      this.showPatientAllergies = false;
    }
  }

  fetchPatientById(id: number) {
    this.patientService.getPatient(id).subscribe((data) => {
      this.patients = data;
      //this.patientAllergyList = this.IAllergydetails;
    });
  }

  addPatient() {
    //addPatientAllergy()
    this.patientService.addPatient(this.patients).subscribe((data) => {
      if (data.indexOf("200") != -1) {
        alert("Patient created successfully")
      }

      if (data.indexOf("510") != -1) {
        alert("duplicate Patient try again")
      }
      console.log(data)
    });
  }

  saveAllergyId() {
    this.patients.patientAllergyVO[0].allergyId = this.currentAllergyDetails.allergyId;
    console.log("Allergy added");
    this.patientAllergy();
  }

  addPatientAllergy() {
    //this.currentPatientAllergy.patientId = this.currentAllergyDetails;

    this.patientService.addPatientAllergy(this.currentPatientAllergy).subscribe((data) => {
      console.log(data);
      //this.fetchPatientById(this.currentPatientAllergy.patientId);
    });
    console.log("Patient added");
  }

  // Remove allergy record from temp allergy list...
  removeAllergiesFromList(patall: AllergyDetails) {
    for (var i = this.allergyDetailsList.length - 1; i >= 0; i--) {
      if (this.allergyDetailsList[i] === patall) {
        this.allergyDetailsList.splice(i, 1);
      }
    }
  }
}

export class AllergyDetails implements IAllergydetails {
  allergyCode: number;
  allergyId: number;
  allergyDescription: string;
}
