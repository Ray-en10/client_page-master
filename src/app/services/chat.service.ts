import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {  Observable, Subject } from 'rxjs';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private client: Client;
  private messagesSubject = new Subject<Message>();
  messages$ = this.messagesSubject.asObservable();
  apiUrl = 'http://localhost:8080/api/messages';
  constructor(private http: HttpClient) {
    this.client = Stomp.over(() => new SockJS('http://localhost:8080/ws'));
  }

  public connect(callback: () => void) {
    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      callback();
    };
    this.client.activate();
  }
  public disconnect() {
    if (this.client.connected) {
      this.client.deactivate();
    }
    console.log('Disconnected');
  }

  public sendMessage(msg: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}`, msg);
  }


  public receiveMessages() {
    this.client.subscribe('/topic/messages', message => {
      console.log('Received message:', JSON.parse(message.body));
      this.messagesSubject.next(JSON.parse(message.body));
    });
  }
  getMessagesForClient(clientCode: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/client/${clientCode}`);
  }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }


}
