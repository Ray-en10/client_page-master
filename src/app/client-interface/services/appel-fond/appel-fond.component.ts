import { AppelfondService } from '../../../services/appelfond.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { Appelfond } from '../../../models/appelfond';
import { Router } from '@angular/router';
import { ResponsableService } from '../../../services/responsable.service';

@Component({
  selector: 'app-appel-fond',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appel-fond.component.html',
  styleUrls: ['./appel-fond.component.scss']
})
export class AppelFondComponent implements OnInit {
  client: any;
  userName: string = '';
  lastName: string = '';
  email: string = '';
  code: number = 0;
  codeResponsable: number = 0;
  appeldufondForm: FormGroup = new FormGroup({});
  showProfilePopup: boolean = false;
  currentDate: string | undefined;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private responsableService: ResponsableService,
    private appelfondService: AppelfondService,
    private router: Router
  ) {}
  toggleProfilePopup() {
    this.showProfilePopup = !this.showProfilePopup;
  }

  goToProfile() {
    // Implement navigation to profile page
  }

  Clientinfo(): void {
    // Implement Clientinfo function
  }
  ngOnInit() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    this.currentDate = today.toLocaleDateString('fr-fr', options);

    this.client = history.state.client;
    if (this.client) {
      console.log('Client:', this.client);
      const client = this.clientService.getClient();
      this.userName = client?.name || '';
      this.lastName = client?.lastname || '';
      this.email = client?.email || '';
      this.code = client?.code || 0;
      console.log(this.code);
    } else {
      console.error('No client data found');
    }

    // Retrieve codeResponsable from local storage
    const token = localStorage.getItem('token');
    if (token) {
      const parsedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
      this.codeResponsable = parsedToken.codeResponsable;
    }

    this.appeldufondForm = this.formBuilder.group({
      B50: [0, [Validators.required, Validators.min(0)]],
      B20: [0, [Validators.required, Validators.min(0)]],
      B10: [0, [Validators.required, Validators.min(0)]],
      B5: [0, [Validators.required, Validators.min(0)]],
      monnaie: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }]
    });
    this.appeldufondForm.get('B50')!.valueChanges.subscribe(() => this.calculateTotal());
    this.appeldufondForm.get('B20')!.valueChanges.subscribe(() => this.calculateTotal());
    this.appeldufondForm.get('B10')!.valueChanges.subscribe(() => this.calculateTotal());
    this.appeldufondForm.get('B5')!.valueChanges.subscribe(() => this.calculateTotal());
    this.appeldufondForm.get('monnaie')!.valueChanges.subscribe(() => this.calculateTotal());
  }

  calculateTotal() {
    const B50Control = this.appeldufondForm.get('B50');
    const B20Control = this.appeldufondForm.get('B20');
    const B10Control = this.appeldufondForm.get('B10');
    const B5Control = this.appeldufondForm.get('B5');
    const monnaieControl = this.appeldufondForm.get('monnaie');
    const totalControl = this.appeldufondForm.get('total');

    const B50 = B50Control ? B50Control.value || 0 : 0;
    const B20 = B20Control ? B20Control.value || 0 : 0;
    const B10 = B10Control ? B10Control.value || 0 : 0;
    const B5 = B5Control ? B5Control.value || 0 : 0;
    const monnaie = monnaieControl ? monnaieControl.value || 0 : 0;

    console.log('B50:', B50);
    console.log('B20:', B20);
    console.log('B10:', B10);
    console.log('B5:', B5);
    console.log('monnaie:', monnaie);

    const total = (50 * B50) + (20 * B20) + (10 * B10) + (5 * B5) + monnaie;

    console.log('total:', total);

    if (totalControl) {
      totalControl.enable();
      totalControl.setValue(total);
      totalControl.disable();
    }
  }

  validateInput(event: any, controlName: string) {
    if (event.target.value < 0) {
      event.target.value = 0;
      this.appeldufondForm.get(controlName)?.setValue(0);
    }
  }

  submitAppelFond() {
    const B50 = this.appeldufondForm.get('B50')?.value || 0;
    const B20 = this.appeldufondForm.get('B20')?.value || 0;
    const B10 = this.appeldufondForm.get('B10')?.value || 0;
    const B5 = this.appeldufondForm.get('B5')?.value || 0;
    const monnaie = this.appeldufondForm.get('monnaie')?.value || 0;

    const client = this.clientService.getClient();
    const responsable = this.responsableService.getResponsable();
    let appelfond = new Appelfond(new Date(), client, responsable, B50, B20, B10, B5, monnaie);

    this.appelfondService.addAF(appelfond).subscribe(response => {
      console.log('Response from server:', response);
      alert("demande envoyer avec succees ! !")
      this.router.navigate(['/home']);
    }, error => {
      console.error('Error:', error);
    });
  }

  logout(): void {
    // Clear local storage
    localStorage.clear();
    console.log('Local storage cleared');
    // Navigate back to login page
    this.router.navigate(['login']);
  }

  toggleMainHeaderLink(event: MouseEvent) {
    const mainHeaderLinks = document.querySelectorAll('.main-header-link');
    mainHeaderLinks.forEach((link) => link.classList.remove('is-active'));
    (event.target as HTMLElement).classList.add('is-active');
  }
}
