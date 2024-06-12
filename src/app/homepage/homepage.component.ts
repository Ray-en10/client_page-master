import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../accueil/footer/footer.component';
import { AccueilComponent } from '../accueil/accueil.component';
import { NgxSpinnerService,NgxSpinnerModule } from "ngx-spinner";
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,NavbarComponent,AccueilComponent,FooterComponent,NgxSpinnerModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  title: string;
  constructor(private globalService: GlobalService,private spinner: NgxSpinnerService) {
    this.title = this.globalService.globalVar;
  }
  openSpinner(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },3000)
  }
}
