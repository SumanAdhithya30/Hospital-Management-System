import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Import FormsModule here
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  appointments: any[] = [];
  patients: any[] = [];
  doctors: any[] = [];

  // Define the _id field for newAppointment
  newAppointment = {
    _id: '',  // Add _id to handle updating
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    purpose: ''
  };

  isEditMode = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors();
    this.loadPatients();
  }

  loadAppointments(): void {
    this.http.get<any[]>('http://localhost:3000/api/appointments').subscribe(data => {
      this.appointments = data;
    });
  }

  loadDoctors(): void {
    this.http.get<any[]>('http://localhost:3000/api/doctors').subscribe(data => {
      this.doctors = data;
    });
  }

  loadPatients(): void {
    this.http.get<any[]>('http://localhost:3000/api/patients').subscribe(data => {
      this.patients = data;
    });
  }

  addAppointment(): void {
    if (this.isEditMode && this.newAppointment._id) {
      // Edit the appointment if _id is present
      this.http.put(`http://localhost:3000/api/appointments/${this.newAppointment._id}`, this.newAppointment)
        .subscribe(() => {
          this.loadAppointments();
          this.resetForm();
        });
    } else {
      // Add a new appointment
      this.http.post('http://localhost:3000/api/appointments', this.newAppointment)
        .subscribe(() => {
          this.loadAppointments();
          this.resetForm();
        });
    }
  }

  editAppointment(appointment: any): void {
    this.newAppointment = { ...appointment };  // Copy the selected appointment
    this.isEditMode = true;
  }

  deleteAppointment(appointmentId: string): void {
    this.http.delete(`http://localhost:3000/api/appointments/${appointmentId}`)
      .subscribe(() => {
        this.loadAppointments();
      });
  }

  resetForm(): void {
    this.newAppointment = {
      _id: '',
      patientId: '',
      doctorId: '',
      date: '',
      time: '',
      purpose: ''
    };
    this.isEditMode = false;
  }
}
