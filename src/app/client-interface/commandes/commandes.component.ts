import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { AppelfondService } from '../../services/appelfond.service';
import { Appelfond } from '../../models/appelfond';
import { ResponsableService } from '../../services/responsable.service';
import { NavbarComponent } from '../navbar/navbar.component'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { ChatComponent } from '../chat/chat.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [ChatComponent,NavbarComponent,SidebarComponent,CommonModule],
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  appelfonds: Appelfond[] = [];
  isLoggedInAsClient: boolean = false;
  isLoggedInAsResponsible: boolean = false;

  constructor(
    private clientService: ClientService,
    private appelfondService: AppelfondService,
    private responsableService: ResponsableService,

  ) {}

  ngOnInit(): void {
    if (this.clientService.getClient() !== null) {
      this.isLoggedInAsClient = true;
      this.getClientAppelfonds();
    } else if (this.responsableService.getResponsable() !== null) {
      this.isLoggedInAsResponsible = true;
      this.fetchResponsibleDemands();
    }
  }

  getClientAppelfonds(): void {
    const client = this.clientService.getClient();
    if (client && client.code) {
      this.appelfondService.getAppelfondByClientId(client.code).subscribe(
        (data: Appelfond[]) => {
          this.appelfonds = data;
        },
        error => {
          console.error('Error fetching appelfond data', error);
        }
      );
    } else {
      console.error('No client logged in');
    }
  }

  fetchResponsibleDemands() {
    this.appelfondService.getAppelfonds().subscribe((data: Appelfond[]) => {
      this.appelfonds = data.filter(demand => demand.responsable !== null);
    });
  }


}
