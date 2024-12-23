import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/api/patients';  // API URL of the backend

  constructor(private http: HttpClient) {}

  // Get all patients
  getPatients(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add new patient
  addPatient(patientData: any): Observable<any> {
    return this.http.post(this.apiUrl, patientData);
  }

  // Update patient
  updatePatient(id: string, patientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, patientData);
  }

  // Delete patient
  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
