import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,NavbarComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  private toastService: HotToastService;


  constructor(private clientService: ClientService,  private router: Router,   private toastServiceInjected: HotToastService
  ) {
    this.toastService = toastServiceInjected;
  }

  onSubmit() {
    this.clientService.forgotPassword(this.email).subscribe(response => {
      console.log(response.message);
    }, error => {
      console.error(error);
    });
    this.toastService.success('Email Envoyez');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
