import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctors',
  standalone: true,  // Mark as standalone component
  imports: [CommonModule, FormsModule],  // Import necessary modules
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent {
  doctors: { 
    _id?: string, 
    name: string, 
    specialization: string, 
    contact: string, 
    email: string, 
    address: string, 
    experience: number 
  }[] = [];

  newDoctor: { 
    _id?: string,  // _id is optional when adding a new doctor
    name: string, 
    specialization: string, 
    contact: string, 
    email: string, 
    address: string, 
    experience: number 
  } = { 
    name: '', 
    specialization: '', 
    contact: '', 
    email: '', 
    address: '', 
    experience: 0 
  };

  isEditMode = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.http.get<{ 
      _id: string, 
      name: string, 
      specialization: string, 
      contact: string, 
      email: string, 
      address: string, 
      experience: number 
    }[]>('http://localhost:3000/api/doctors')
      .subscribe((data) => {
        this.doctors = data;
      });
  }

  addDoctor(): void {
    if (this.isEditMode) {
      // Update doctor if in edit mode
      const { _id, ...doctorWithoutId } = this.newDoctor; // Remove _id before updating
      this.http.put<{ 
        name: string, 
        specialization: string, 
        contact: string, 
        email: string, 
        address: string, 
        experience: number 
      }>(`http://localhost:3000/api/doctors/${this.newDoctor._id}`, doctorWithoutId)
        .subscribe({
          next: (response) => {
            console.log('Doctor updated:', response);
            this.loadDoctors();
            this.resetForm();
          },
          error: (err) => {
            console.error('Error updating doctor:', err);
          }
        });
    } else {
      // Add a new doctor (without _id)
      this.http.post<{ 
        _id: string, 
        name: string, 
        specialization: string, 
        contact: string, 
        email: string, 
        address: string, 
        experience: number 
      }>('http://localhost:3000/api/doctors', this.newDoctor)
        .subscribe({
          next: (response) => {
            console.log('Doctor added:', response);
            this.doctors.push(response); // Add the new doctor to the list
            this.resetForm();
          },
          error: (err) => {
            console.error('Error adding doctor:', err);
          }
        });
    }
  }

  editDoctor(doctor: any): void {
    this.newDoctor = { ...doctor }; // Copy the selected doctor to the form
    this.isEditMode = true;
  }

  deleteDoctor(doctorId: string): void {
    this.http.delete(`http://localhost:3000/api/doctors/${doctorId}`)
      .subscribe({
        next: () => {
          console.log('Doctor deleted');
          this.doctors = this.doctors.filter(doc => doc._id !== doctorId); // Remove from the list
        },
        error: (err) => {
          console.error('Error deleting doctor:', err);
        }
      });
  }

  resetForm(): void {
    this.newDoctor = { 
      name: '', 
      specialization: '', 
      contact: '', 
      email: '', 
      address: '', 
      experience: 0 
    };
    this.isEditMode = false;
  }
}
