import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,NavbarComponent],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  private toastService: HotToastService;

  constructor(private clientService: ClientService, private route: ActivatedRoute,  private router: Router,private toastServiceInjected: HotToastService
  ) {
    this.toastService = toastServiceInjected;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  onSubmit() {
    this.clientService.resetPassword(this.token, this.newPassword).subscribe(response => {
      console.log(response.message);
    }, error => {
      console.error(error);
    });
    this.toastService.success('Mot de passe changer avec success');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
