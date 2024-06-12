import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MiseADispositionService } from '../../../services/miseadisposition.service';
import { CommonModule } from '@angular/common';
import { ResponsableService } from '../../../services/responsable.service';

@Component({
  selector: 'app-mise-a-dispo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mise-a-dispo.component.html',
  styleUrls: ['./mise-a-dispo.component.scss']
})
export class MiseADispoComponent implements OnInit {
  miseADispositionForm: FormGroup;
  clientCode: string | null = null;
  responsableId: number | null = null;
  responsableCode: string | null = null;

  constructor(
    private fb: FormBuilder,
    private miseADispositionService: MiseADispositionService,
    private responsableService: ResponsableService,
    private router: Router
  ) {
    this.miseADispositionForm = this.fb.group({
      state: ['en cours', Validators.required],
      livrer: [false, Validators.required],
      chequesBancaires: [false, Validators.required],
      titresDePaiement: [false, Validators.required],
      documentsBancaires: [false, Validators.required],
      documentsConfidentiels: [false, Validators.required]
    });
  }

  ngOnInit() {
    const clientData = localStorage.getItem('client');
    const responsableData = localStorage.getItem('responsable');

    if (clientData) {
      const client = JSON.parse(clientData);
      this.clientCode = client.code ?? null;
    }

    if (responsableData) {
      const responsable = JSON.parse(responsableData);
      this.responsableId = responsable.id ?? null;
      this.responsableCode = responsable.codeResponsable ?? null;
    }

    if (!this.clientCode && !this.responsableCode) {
      const token = localStorage.getItem('token');
      if (token) {
        const parsedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
        this.responsableId = parsedToken.id;
        this.responsableCode = parsedToken.codeResponsable;
      }
    }
  }

  onSubmit() {
    if (this.miseADispositionForm.valid) {
      let miseADispositionData: any = {
        ...this.miseADispositionForm.value,
        state: this.miseADispositionForm.value.state,
        livrer: this.miseADispositionForm.value.livrer,
        chequesBancaires: this.miseADispositionForm.value.chequesBancaires,
        titresDePaiement: this.miseADispositionForm.value.titresDePaiement,
        documentsBancaires: this.miseADispositionForm.value.documentsBancaires,
        documentsConfidentiels: this.miseADispositionForm.value.documentsConfidentiels
      };

      if (this.clientCode) {
        miseADispositionData = {
          ...miseADispositionData,
          client: { code: this.clientCode },
          responsable: null
        };
      } else if (this.responsableCode) {
        miseADispositionData = {
          ...miseADispositionData,
          client: null,
          responsable: { id: this.responsableId, codeResponsable: this.responsableCode }
        };
      }

      this.miseADispositionService.saveMiseADisposition(miseADispositionData).subscribe(
        response => {
          console.log('Mise à disposition saved successfully', response);
          this.router.navigate(['/miseadispositions']);
        },
        error => {
          console.error('Error saving mise à disposition:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
