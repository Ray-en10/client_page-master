import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {
  isLoginCardVisible: boolean = false;
  currentIndex = 0;
  isSubNavVisible: boolean[] = [false, false];


  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToSignup() {
    this.router.navigate(['/sign']);
  }
  toggleLoginCard() {
    this.isLoginCardVisible = !this.isLoginCardVisible;
  }
  toggleSubNav(index: number) {
    this.isSubNavVisible[index] = !this.isSubNavVisible[index];
    this.currentIndex = 2;
  }
}
