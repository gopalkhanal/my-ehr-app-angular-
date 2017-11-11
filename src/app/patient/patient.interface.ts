// export interface IAddress{
//     street: string,
//     city : string,
//     state: string,
//     zip : number
// }

// export interface IContactInfo{
//     email:string,
//     homePhone:number,
//     cellPhone:number,
//     methodOfContact: string
// }

export interface IPatient {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    addressVO: { street: string, city: string, state: string, zip: number };
    contactInfoVO: { email: string, homePhone: number, cellPhone: number, methodOfContact: string };
    // addressVO:{'street':"",'city':"",'state':"",'zip':null};
    // contactInfoVO:{'email':"",'homePhone':null,'cellPhone':null,'methodOfContact':""};
    patientCode: number;
    patientStatus: string;
    ssn: string;
    dateCreated: String;
    dateModified: String;

    patientAllergyVO: [{
        patientAllergyId: number;
        allergyId: number;
        patientId: number;
        dateCreated: string;
    }]
}