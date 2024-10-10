import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Required for routing

@Component({
  selector: 'app-home',
  standalone: true,  // Mark this as a standalone component
  imports: [RouterModule],  // Import RouterModule to enable routing
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Add your logic here
}
