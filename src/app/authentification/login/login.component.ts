import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ResponsableService } from '../../services/responsable.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordFieldType: string = 'password';
  private toastService: HotToastService;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private responsableService: ResponsableService,
    private router: Router,
    private toastServiceInjected: HotToastService
  ) {
    this.toastService = toastServiceInjected;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    localStorage.removeItem('token');
  }

  navigateToSignup() {
    this.router.navigate(['/sign']);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastService.error('Vous devez remplir tous les champs correctement.', {
        style: {
          background: 'red',
          color: 'white',
        },
      });
      return;
    }

    const { code, email, password } = this.loginForm.value;
    const isResponsable = code.startsWith('r');

    if (isResponsable) {
      this.responsableService.authenticate(email, password, code).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('responsable', JSON.stringify(response.user));
          this.toastService.success('Connexion réussie');
          this.router.navigate(['/client']); // Navigate to client interface
          console.log('Responsable authentication response:', response);
        },
        (error) => {
          console.error('Responsable authentication error:', error);
        }
      );
    } else {
      this.clientService.authenticate(code, email, password).subscribe(
        (response) => {
          console.log('Authentication response:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('client', JSON.stringify(response.user));
          this.toastService.success('Connexion réussie');
          setTimeout(() => {
            this.router.navigate(['/client']);
          }, 1000);
        },
        (error) => {
          console.error('Authentication error:', error);
          if (error.status === 401) {
            this.toastService.error('Échec de la connexion', {
              style: {
                background: 'red',
                color: 'white',
              },
            });
            console.log('User is not authenticated');
          } else {
            console.error('An error occurred:', error);
          }
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onUsernameInput(event: any) {
    const input = event.target;
    input.value = input.value.toLowerCase().replace(/[^a-z]/g, '');
    this.loginForm.get('adherant')?.setValue(input.value, { emitEvent: false });
  }

  usernameValidator(control: any) {
    const usernamePattern = /^[a-z]+$/;
    return usernamePattern.test(control.value)
      ? null
      : { invalidUsername: true };
  }
}
