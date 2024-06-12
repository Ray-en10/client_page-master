import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/client';

  constructor(private http: HttpClient) { }

  authenticate(code: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, { code, email, password });
  }

  getClient(): any {
    const item = localStorage.getItem('client');
    return item ? JSON.parse(item) : null;
  }

  setClient(value: any) {
    localStorage.setItem('client', JSON.stringify(value));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  registerClient(clientData: Client): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, clientData);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }
  updateClient(client: Client): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, client);
  }
}
