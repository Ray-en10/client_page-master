import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ResponsableService } from '../../services/responsable.service';
import { Component, OnInit } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ChatComponent, NavbarComponent, SidebarComponent, FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isClient: boolean = false;
  isResponsable: boolean = false;
  user: any = {};

  constructor(
    private clientService: ClientService,
    private responsableService: ResponsableService,
    private router: Router
  ) {}

  ngOnInit() {
    const client = this.clientService.getClient();
    const responsable = this.responsableService.getResponsable();

    if (client) {
      this.isClient = true;
      this.user = client;
    } else if (responsable) {
      this.isResponsable = true;
      this.user = {
        ...responsable,
        agence: responsable.agence || {}, // Ensure agence is defined
        bank: responsable.agence?.bank || {} // Ensure bank is defined
      };
    } else {
      // Handle case where no user is logged in
      this.router.navigate(['login']);
    }
  }

  saveChanges() {
    if (this.isClient) {
      this.clientService.updateClient(this.user).subscribe(response => {
        console.log('Client updated successfully');
      }, error => {
        console.error('Error updating client', error);
      });
    } else if (this.isResponsable) {
      this.responsableService.updateResponsable(this.user.id, this.user).subscribe(response => {
        console.log('Responsable updated successfully');
      }, error => {
        console.error('Error updating responsable', error);
      });
    }
  }

  logout(): void {
    localStorage.clear();
    console.log('Local storage cleared');
    this.router.navigate(['login']);
  }
}
