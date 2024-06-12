import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private baseUrl = 'http://localhost:8080/responsables';

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string, codeResponsable: string): Observable<any> {
    const loginData = { email, password, codeResponsable };
    return this.http.post<any>(`${this.baseUrl}/login`, loginData);
  }
  setResponsable(value: any) {
    localStorage.setItem('responsable', JSON.stringify(value));
  }
  getResponsable(): any {
    const item = localStorage.getItem('responsable');
    return item ? JSON.parse(item) : null;
  }

  getResponsablesList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getResponsableById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createResponsable(responsable: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, responsable);
  }

  updateResponsable(id: number, responsable: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, responsable);
  }

  deleteResponsable(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
