import { Component, OnInit } from '@angular/core';
import { Admin, Message } from '../../models/message';
import { ChatService } from '../../services/chat.service';
import { Client } from '../../models/client';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  isChatOpen = false;
  code_cli: number = 0;
  userName: string = '';
  email: string = '';
  lastName: string = '';
  messages: Message[] = [];
  client!: Client;
  admin!: Admin;

  logout(): void {
    localStorage.clear();
    console.log('Local storage cleared');
    this.router.navigate(['login']);
  }

  constructor(private Clientservice: ClientService,private chatService: ChatService , private router: Router) { }

  ngOnInit() {
    const client = this.Clientservice.getClient();
    this.userName = client.name;
    this.lastName = client.lastname;
    this.code_cli= client.code
    this.chatService.connect(() => {
      this.chatService.receiveMessages();
    });



    console.log("this.admin");

    let clientData = localStorage.getItem('client');
    if (clientData !== null) {
      this.client = JSON.parse(clientData);
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
}
