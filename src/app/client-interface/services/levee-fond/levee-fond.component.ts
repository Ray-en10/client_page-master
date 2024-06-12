import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeveefondService } from '../../../services/leveefond.service';
import { Leveefond } from '../../../models/leveefond';
import { ResponsableService } from '../../../services/responsable.service';





@Component({
  selector: 'app-levee-fond',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './levee-fond.component.html',
  styleUrl: './levee-fond.component.scss',
})
export class LeveeFondComponent implements OnInit {
  client: any;
  userName: string = '';
  email: string = '';
  code: number = 0;
  codeResponsable: number = 0;
  lastName: string = '';
  showProfilePopup: boolean = false;
  currentDate: string | undefined;
  leveedufondForm: FormGroup = new FormGroup({});

  constructor(
    private clientService: ClientService,
    private responsableService: ResponsableService,
    private formBuilder: FormBuilder,
    private LeveefondService: LeveefondService,
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
     const token = localStorage.getItem('token');
     if (token) {
       const parsedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
       this.codeResponsable = parsedToken.codeResponsable;
     }
    this.leveedufondForm = this.formBuilder.group({
      B50: [0, [Validators.required, Validators.min(0)]],
      B20: [0, [Validators.required, Validators.min(0)]],
      B10: [0, [Validators.required, Validators.min(0)]],
      B5: [0, [Validators.required, Validators.min(0)]],
      monnaie: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });
    this.leveedufondForm
      .get('B50')!
      .valueChanges.subscribe(() => this.calculateTotal());
    this.leveedufondForm
      .get('B20')!
      .valueChanges.subscribe(() => this.calculateTotal());
    this.leveedufondForm
      .get('B10')!
      .valueChanges.subscribe(() => this.calculateTotal());
    this.leveedufondForm
      .get('B5')!
      .valueChanges.subscribe(() => this.calculateTotal());
    this.leveedufondForm
      .get('monnaie')!
      .valueChanges.subscribe(() => this.calculateTotal());
  }

  calculateTotal() {
    const B50Control = this.leveedufondForm.get('B50');
    const B20Control = this.leveedufondForm.get('B20');
    const B10Control = this.leveedufondForm.get('B10');
    const B5Control = this.leveedufondForm.get('B5');
    const monnaieControl = this.leveedufondForm.get('monnaie');
    const totalControl = this.leveedufondForm.get('total');

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

    const total = 50 * B50 + 20 * B20 + 10 * B10 + 5 * B5 + monnaie;

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
      this.leveedufondForm.get(controlName)?.setValue(0);
    }
  }

  submitLeveeFond() {
    const B50 = this.leveedufondForm.get('B50')?.value || 0;
    const B20 = this.leveedufondForm.get('B20')?.value || 0;
    const B10 = this.leveedufondForm.get('B10')?.value || 0;
    const B5 = this.leveedufondForm.get('B5')?.value || 0;
    const monnaie = this.leveedufondForm.get('monnaie')?.value || 0;

    const client = this.clientService.getClient();
    const responsable = this.responsableService.getResponsable();
    let leveefond = new Leveefond(
      new Date(),
      client,
      responsable,
      B50,
      B20,
      B10,
      B5,
      monnaie
    );

    this.LeveefondService.addlf(leveefond).subscribe(
      (response) => {
        console.log('Response from server:', response);
        alert('demande envoyer avec succees ! !');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
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
