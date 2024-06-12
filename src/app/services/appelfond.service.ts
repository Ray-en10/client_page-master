import { Injectable } from '@angular/core';
import { Appelfond } from '../models/appelfond';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppelfondService {
  private apiUrl = 'http://localhost:8080/appelfond';
  constructor(private http: HttpClient) { }

  addAF(service: Appelfond): Observable<any> {
    return this.http.post<any>('http://localhost:8080/appelfond', service);
  }

  getAppelfonds(): Observable<Appelfond[]> {
    return this.http.get<Appelfond[]>(this.apiUrl);
  }

  getAppelfondByClientId(clientId: string): Observable<Appelfond[]> {
    return this.http.get<Appelfond[]>(`${this.apiUrl}/client/${clientId}`);
  }

}
