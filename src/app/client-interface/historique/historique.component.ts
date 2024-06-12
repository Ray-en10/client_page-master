import { Component, OnInit } from '@angular/core';
import { Appelfond } from '../../models/appelfond';
import { AppelfondService } from '../../services/appelfond.service';
import { ChatComponent } from '../chat/chat.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResponsableService } from '../../services/responsable.service';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [ChatComponent, NavbarComponent, SidebarComponent, CommonModule],
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  historique: Appelfond[] = [];
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
      this.fetchHistorique();
    }
  }

  getClientAppelfonds(): void {
    const client = this.clientService.getClient();
    if (client && client.code) {
      this.appelfondService.getAppelfondByClientId(client.code).subscribe(
        (data: Appelfond[]) => {
          this.historique = data.filter(item => item.livrer === true);
        },
        error => {
          console.error('Error fetching historique data', error);
        }
      );
    } else {
      console.error('No client logged in');
    }
  }

  fetchHistorique(): void {
    this.appelfondService.getAppelfonds().subscribe((data: Appelfond[]) => {
      this.historique = data.filter(demand => demand.responsable !== null && demand.livrer === true);
    });
  }

  printFacture(item: Appelfond): void {
    const doc = new jsPDF();
    const total = item.b50*50 + item.b20*20 + item.b10*10 + item.b5*5 + item.monnaie;

    const content = `
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .page {
          width: 100%;
        }
        .invoice {
          padding: 20mm;
          box-sizing: border-box;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-left h1 {
          margin: 0;
        }
        .block1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          margin-bottom: 2rem;
          width: 250px;
          height: auto;
        }
        .client-info, .Facture-info {
          border: 3px solid rgba(0, 74, 139, 0.795);
          width: 40%;
          height: 8rem;
          padding: 0rem 1rem 0rem 1rem;
        }

        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 5rem;
        }
        .invoice-table td {
          padding: 8px;
          text-align: center;

        }
        .invoice-table th {
          padding: 8px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }
        table {
          border-collapse: collapse;
          width: 97%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        th {
          padding: 10px;
          color: white;
          text-align: center;
        }
        td {
          height: 5rem;
          text-align: center;
          border: 1px solid #405adba9;
        }
        th {
          padding: 10px;
          color: white;
          text-align: center;
            background-color: #021b6fc7;
        }
        th ::first-letter {
          text-transform: uppercase;
        }
        tr>th:nth-child(1) {
          border-top-left-radius: 8px;
        }
        tr>th:nth-child(6) {
          border-top-right-radius: 8px;
        }
      </style>
      <div class="page">
        <div class="invoice">
          <div class="header">
            <div class="header-left">
              <img src="assets/logo.png" alt="Logo" class="logo" />
            </div>
            <div class="header-right">
              <p>contact@tunisie-securite.com</p>
              <p>(+216) 70 858 147</p>
            </div>
          </div>
          <div class="block1">
            <div class="client-info">
              <p><strong>Code:</strong> ${item.client?.code || item.responsable?.agence.codeAgence}</p>
              ${item.client ? `<p><strong>Nom:</strong> ${item.client?.name} ${item.client?.lastname}</p>` : ''}
               ${item.client ? `<p><strong>Numero: </strong>+216 ${item.client?.phone}</p>` : ''}
              ${item.responsable ? `<p><strong>Banque:</strong> ${item.responsable?.agence.bank.full_name}</p>` : ''}
              ${item.responsable ? `<p><strong>Agence:</strong> ${item.responsable?.agence.name}</p>` : ''}
              ${item.responsable ? `<p><strong>Adresse:</strong>${item.responsable?.agence.address}</p>` : ''}
            </div>
            <div class="Facture-info">
              <p><strong>Facture N°:</strong> ${item.codeAP}</p>
               <p><strong>Email:</strong> ${item.client?.email || item.responsable?.email}</p>
              <p><strong>Date:</strong> ${new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <table class="invoice-table">
            <thead>
              <tr>
                <th>B50</th>
                <th>B20</th>
                <th>B10</th>
                <th>B5</th>
                <th>Monnaie</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Billet de 50dt:</strong>  ${item.b50}</td>
                <td><strong>Billet de 20dt:</strong> ${item.b20}</td>
                <td><strong>Billet de 10dt:</strong> ${item.b10}</td>
                <td><strong>Billet de 5dt:</strong> ${item.b5}</td>
                <td><strong>Monnaie:</strong> ${item.monnaie}</td>
                <td><strong> ${total}.000</strong></td>
              </tr>
            </tbody>
          </table>
          <h3></h3>
        </div>
      </div>
    `;

    const div = document.createElement('div');
  div.innerHTML = content;
  document.body.appendChild(div);

  html2canvas(div).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Instead of directly saving the PDF, open a new window for printing
    const pdfData = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfData);
    const printWindow = window.open(pdfUrl, '_blank', 'fullscreen=yes');
    if (printWindow) {
      printWindow.print();
    } else {
      console.error('Failed to open print window');
    }

    document.body.removeChild(div);
  });

}
}
