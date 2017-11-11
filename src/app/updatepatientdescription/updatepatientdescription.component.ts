import { Component, OnInit } from '@angular/core';
import { IPatient } from '../patient/patient.interface';
import { PatientService } from '../patient/patient.service';
import { ActivatedRoute } from '@angular/router';
import { IAllergydetails } from './allergydetails.interface';
import { IPatientallergy } from './patientallergy.interface';

@Component({
  selector: 'app-updatepatientdescription',
  templateUrl: './updatepatientdescription.component.html',
  styleUrls: ['./updatepatientdescription.component.css']
})
export class UpdatepatientdescriptionComponent implements OnInit {

  isAdd = false;

  private key: String;
  private event: KeyboardEvent;

  showPatientAllergies = false;

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

  patientAllergies: IPatientallergy[];

  constructor(private patientService: PatientService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = +this.route.snapshot.params['id'];
    this.fetchPatientById(id);
  }

  /**
   * 
   * @param id mahesh
   * Here : Calling get Patient(id) method : from patientservice to get the patient with specified id
   *  for update purpose...
   * Also : Set the value of patientAllergies from patients i.e this.patientAllergies = this.patients.patientAllergyVO
   */
  fetchPatientById(id: number) {
    this.patientService.getPatient(id).subscribe((data) => {
      this.patients = data;
      this.patientAllergies = this.patients.patientAllergyVO;

    });
  }

  // Updates patient information by calling updatePatient() from Service
  updatePatient() {
    this.patientService.updatePatient(this.patients).subscribe((data) => {

      if (data.indexOf("204") != -1) {
        alert("Patient modified successfully")
      }
      console.log(data)
    });
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
    this.patientService.getAllergyDetails(id).subscribe((data) => this.currentAllergyDetails = data);
  }

  // Method to display PatientAllergy
  patientAllergy() {
    if (this.patientAllergies && this.patientAllergies.length) {
      this.showPatientAllergies = true;
    }
    else {
      this.showPatientAllergies = false;
    }
  }

  /**
   * Create allergy : first set patientId of currentPatientAllergy.patientId from patients.id
   *  and currentPatientAllergy.allergyId from currentAllergyDetails.allergyId
   *  and pass the currentPatientAllergy to create new PatientAllergy record.
   */
  createPatientAllergy() {
    this.currentPatientAllergy.patientId = this.patients.id;
    this.currentPatientAllergy.allergyId = this.currentAllergyDetails.allergyId;

    console.log("Patient Id : " + this.currentPatientAllergy.patientId);
    console.log("Allergy Id : " + this.currentPatientAllergy.allergyId);

    this.patientService.addPatientAllergy(this.currentPatientAllergy).subscribe((data) => {
      console.log(data);
      this.fetchPatientById(this.currentPatientAllergy.patientId);
    });
    console.log(this.patientAllergies);
    this.patientAllergy();
  }

  // Remove allergy details
  removePatientAllergy(allergy: IPatientallergy) {
    this.patientService.removePatientAllergy(allergy.patientAllergyId).subscribe((data) => console.log(data));
    this.fetchPatientById(this.currentPatientAllergy.patientId);
  }
}