import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Admin, Message } from '../models/message';
import { ChatService } from '../services/chat.service';
import { Client } from '..//models/client';
import { ChatComponent } from './chat/chat.component';
import { ResponsableService } from '../services/responsable.service';
import { Responsable } from '../models/responsable';
import { NavbarComponent } from '../client-interface/navbar/navbar.component';
import { SidebarComponent } from '../client-interface/sidebar/sidebar.component';


@Component({
  selector: 'app-client-interface',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule,ChatComponent,NavbarComponent,SidebarComponent],
  templateUrl: './client-interface.component.html',
  styleUrl: './client-interface.component.scss',
})
export class ClientInterfaceComponent implements AfterViewInit, OnInit {


  isChatOpen = false;
  code_cli: number = 0;
  userName: string = '';
  email: string = '';
  lastName: string = '';
  messages: Message[] = [];
  client!: Client;
  responsable!: Responsable;
  admin!: Admin;
  showProfilePopup: boolean = false;
  currentDate: string | undefined;

  constructor(
    private Clientservice: ClientService,
    private ResponsableService: ResponsableService,
    private chatService: ChatService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // Initialize current date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    this.currentDate = today.toLocaleDateString('fr-fr', options);

    // Get client or responsable information
    const client = this.Clientservice.getClient();
    if (client) {
      this.userName = client.name;
      this.lastName = client.lastname;
      this.code_cli = client.code;
    } else {
      const responsable = this.ResponsableService.getResponsable();
      if (responsable) {
        this.userName = responsable.name;
        this.lastName = responsable.lastname;
        this.code_cli = responsable.codeResponsable;
      }
    }

    this.chatService.connect(() => {
      this.chatService.receiveMessages();
    });

    console.log("this.admin");

    let clientData = localStorage.getItem('client');
    if (clientData !== null) {
      this.client = JSON.parse(clientData);
    }

    let responsableData = localStorage.getItem('responsable');
    if (responsableData !== null) {
      this.responsable = JSON.parse(responsableData);
    }

    this.admin = new Admin(1);

    this.chatService.getMessagesForClient(this.client.code!).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );

    this.chatService.messages$.subscribe(
      (msg: Message) => {
        console.log('Received message:', msg);
        this.messages.push(msg);
      }
    );
  }

  ngAfterViewInit() {
    const listView = this.elementRef.nativeElement.querySelector('.list-view');
    const gridView = this.elementRef.nativeElement.querySelector('.grid-view');
    const projectsList = this.elementRef.nativeElement.querySelector('.project-boxes');

    if (listView && gridView && projectsList) {
      listView.addEventListener('click', () => {
        gridView.classList.remove('active');
        listView.classList.add('active');
        projectsList.classList.remove('jsGridView');
        projectsList.classList.add('jsListView');
      });

      gridView.addEventListener('click', () => {
        gridView.classList.add('active');
        listView.classList.remove('active');
        projectsList.classList.remove('jsListView');
        projectsList.classList.add('jsGridView');
      });
    }

    // Set up messages section
    const messagesBtn = this.elementRef.nativeElement.querySelector('.messages-btn');
    const messagesClose = this.elementRef.nativeElement.querySelector('.messages-close');
    if (messagesBtn && messagesClose) {
      messagesBtn.addEventListener('click', () => {
        document.querySelector('.messages-section')?.classList.add('show');
      });

      messagesClose.addEventListener('click', () => {
        document.querySelector('.messages-section')?.classList.remove('show');
      });
    }
  }


  sendMessage(event: Event, msg: string) {
    event.preventDefault();
    console.log('Sending message:', msg);
    const message = new Message(msg, this.admin, this.client);
    this.chatService.sendMessage(message).subscribe(
      (sentMessage: Message) => {
        this.messages.push(sentMessage);
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  toggleMainHeaderLink(event: MouseEvent) {
    const mainHeaderLinks = document.querySelectorAll('.main-header-link');
    mainHeaderLinks.forEach((link) => link.classList.remove('is-active'));
    (event.target as HTMLElement).classList.add('is-active');
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  toggleProfilePopup() {
    this.showProfilePopup = !this.showProfilePopup;
  }

  goToProfile() {
    // Implement navigation to profile page
  }

  Clientinfo(): void {
    // Implement Clientinfo function
  }

  clearLocalStorage(): void {
    localStorage.clear();
    console.log('Local storage cleared');
    this.router.navigate(['login']);
  }

  logout(): void {
    localStorage.clear();
    console.log('Local storage cleared');
    this.router.navigate(['login']);
  }

  nav1() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['af'], { state: { client } });
  }

  nav2() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['lv'], { state: { client } });
  }

  nav3() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['md'], { state: { client } });
  }

  nav4() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['echange'], { state: { client } });
  }

  side1() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['client'], { state: { client } });
  }

  side2() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['profil'], { state: { client } });
  }

  side3() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['historique'], { state: { client } });
  }

  side4() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['validation'], { state: { client } });
  }

}
