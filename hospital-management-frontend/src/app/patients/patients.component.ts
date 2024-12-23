import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patients',
  standalone: true,  // Mark as standalone component
  imports: [CommonModule, FormsModule],  // Import necessary modules
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  patients: { 
    _id: string,  // _id is required for both editing and displaying patient data
    name: string, 
    age: number, 
    gender: string, 
    contact: string, 
    address: string, 
    conditions: string 
  }[] = [];

  newPatient = { 
    _id: '',  // Add _id field (for update)
    name: '', 
    age: 0, 
    gender: '', 
    contact: '', 
    address: '', 
    conditions: '' 
  };

  isEditMode = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.http.get<{ 
      _id: string, 
      name: string, 
      age: number, 
      gender: string, 
      contact: string, 
      address: string, 
      conditions: string 
    }[]>('http://localhost:3000/api/patients')
      .subscribe((data) => {
        this.patients = data;
      });
  }

  addPatient(): void {
    if (this.isEditMode) {
      // Ensure _id is present when editing an existing patient
      if (!this.newPatient._id) {
        console.error('Error: _id is required for updating');
        return;
      }

      // Update patient if in edit mode
      this.http.put<{ 
        name: string, 
        age: number, 
        gender: string, 
        contact: string, 
        address: string, 
        conditions: string 
      }>(`http://localhost:3000/api/patients/${this.newPatient._id}`, this.newPatient)
        .subscribe({
          next: (response) => {
            console.log('Patient updated:', response);
            this.loadPatients();
            this.resetForm();
          },
          error: (err) => {
            console.error('Error updating patient:', err);
          }
        });
    } else {
      // Only send patient data without _id when adding a new patient
      const { _id, ...patientData } = this.newPatient; // Exclude _id for new patients

      // Add a new patient
      this.http.post<{ 
        _id: string, 
        name: string, 
        age: number, 
        gender: string, 
        contact: string, 
        address: string, 
        conditions: string 
      }>('http://localhost:3000/api/patients', patientData)
        .subscribe({
          next: (response) => {
            console.log('Patient added:', response);
            this.patients.push(response);
            this.resetForm();
          },
          error: (err) => {
            console.error('Error adding patient:', err);
          }
        });
    }
  }

  editPatient(patient: any): void {
    this.newPatient = { ...patient }; // Copy the selected patient to the form
    this.isEditMode = true;
  }

  deletePatient(patientId: string): void {
    this.http.delete(`http://localhost:3000/api/patients/${patientId}`)
      .subscribe({
        next: () => {
          console.log('Patient deleted');
          this.patients = this.patients.filter(patient => patient._id !== patientId);
        },
        error: (err) => {
          console.error('Error deleting patient:', err);
        }
      });
  }

  resetForm(): void {
    this.newPatient = { _id: '', name: '', age: 0, gender: '', contact: '', address: '', conditions: '' };
    this.isEditMode = false;
  }
}
