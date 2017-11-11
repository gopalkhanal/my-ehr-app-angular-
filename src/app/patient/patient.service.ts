import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IPatient } from './patient.interface';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { IAllergydetails } from '../updatepatientdescription/allergydetails.interface';
import { IPatientallergy } from '../updatepatientdescription/patientallergy.interface';

@Injectable()
export class PatientService {

  private url = 'http://localhost:9090/';

  constructor(private http: Http) { }

  // Getting single Patient by passing only id parameter.
  getPatient(id: number): Observable<IPatient> {
    return this.http.get(this.url + 'patient/' + id).map((response: Response) => <IPatient>response.json())
      .do((data) => console.log(data));
  }

  // Searching Patient by more parameters.
  getPatients(name: String, dob: String, gender: String, zip: number): Observable<IPatient[]> {
    return this.http.get(this.url + 'patient/search?name=' + name + '&dob=' + dob + '&gender=' + gender + '&zip=' + zip).map((response: Response) => <IPatient[]>(response.json().patients))
      .do((data) => console.log(data));

  }

  // Adding new Patient
  addPatient(patient: IPatient): Observable<String> {
    const header = new Headers({ 'Content-type': 'Application/JSON' });

    const requestOptions = new RequestOptions({ headers: header });

    return this.http.post(this.url + 'patient', JSON.stringify(patient), requestOptions)

      //Converting response to string since the return type is string.
      .map((response: Response) => response.toString())
      .do((data) => console.log(data));
  }

  updatePatient(patient: IPatient): Observable<String> {
    const header = new Headers({ 'Content-type': 'Application/JSON' });

    const requestOptions = new RequestOptions({ headers: header });

    return this.http.put(this.url + 'patient', JSON.stringify(patient), requestOptions)
      .map((response: Response) => response.toString())
      .do((data) => console.log(data));
  }

  getAllergyDetails(Id: number): Observable<IAllergydetails> {
    return this.http.get(this.url + 'patient/allergy/' + Id).map((response: Response) => <IAllergydetails>response.json())
    // .do((data)=>console.log(data));
  }

  // Add Patient Allergy
  addPatientAllergy(patientAllergy: IPatientallergy) {
    const header = new Headers({ 'Content-type': 'Application/JSON' });

    const requestOptions = new RequestOptions({ headers: header });

    return this.http.post(this.url + 'patient/patientAllergy', JSON.stringify(patientAllergy), requestOptions)
      .map((response: Response) => <IPatientallergy>response.json())
      .do((data) => console.log(data));
  }

  // Remove PatientAllergy
  removePatientAllergy(patientAllergyId: number): Observable<string> {
    return this.http.delete(this.url + 'patient/allergy/' + patientAllergyId).map((response: Response) => response.toString())
      .do((data) => console.log(data));
  }
}