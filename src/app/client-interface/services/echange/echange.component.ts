import { Responsable } from './../../../models/responsable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EchangeService } from '../../../services/echange.service';
import { CommonModule } from '@angular/common';
import { Client } from '../../../models/client';
import { Echange } from '../../../models/Echange';

@Component({
  selector: 'app-echange',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './echange.component.html',
  styleUrls: ['./echange.component.scss']
})
export class EchangeComponent implements OnInit {
  echangeForm: FormGroup;
  client!: Client | null;
  responsable!: Responsable | null;

  constructor(
    private fb: FormBuilder,
    private echangeService: EchangeService,
    private router: Router
  ) {
    this.echangeForm = this.fb.group({
      montant: ['', [Validators.required, Validators.min(0)]],
      state: ['en cours', Validators.required],
      livrer: [false, Validators.required],
      clientCode: [''],
      responsableId: ['']
    });
  }

  ngOnInit() {
    this.retrieveDataFromNavigationOrStorage();
  }

  retrieveDataFromNavigationOrStorage() {
    // Attempt to retrieve client and responsable from navigation state
    this.client = history.state.client;
    this.responsable = history.state.responsable;

    // If not found in navigation state, try retrieving from local storage
    if (!this.responsable) {
      this.responsable = this.getFromLocalStorage('responsable');
    }
    if (!this.client) {
      this.client = this.getFromLocalStorage('client');
    }

    // If neither client nor responsable data is available, navigate to error page
    if (!this.responsable && !this.client) {
      console.error('Client and Responsable data are missing');
      this.router.navigate(['/error']);
    } else {
      // Populate the form with client and responsable data
      if (this.client) {
        this.echangeForm.get('clientCode')?.setValue(this.client.code);
      }
      if (this.responsable) {
        this.echangeForm.get('responsableId')?.setValue(this.responsable.id);
      }
    }
  }

  getFromLocalStorage(key: string): any {
    const dataJson = localStorage.getItem(key);
    return dataJson ? JSON.parse(dataJson) : null;
  }

  onSubmit() {
    if (this.echangeForm.valid) {
      const echangeData: Echange = {
        montant: this.echangeForm.get('montant')?.value,
        state: this.echangeForm.get('state')?.value,
        livrer: this.echangeForm.get('livrer')?.value,
        client: this.client ? { code: this.client.code! } : null,
        responsable: this.responsable ? { id: this.responsable.id! } : null
      };

      this.echangeService.saveEchange(echangeData).subscribe(
        (response) => {
          console.log('Echange saved successfully', response);
          this.router.navigate(['/echanges']);
        },
        (error) => {
          console.error('Error saving echange', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
