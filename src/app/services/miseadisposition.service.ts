import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MiseADisposition } from '../models/MiseADisposition';

@Injectable({
  providedIn: 'root'
})
export class MiseADispositionService {
  private apiUrl = 'http://localhost:8080/miseadisposition';

  constructor(private http: HttpClient) { }

  getAllMiseADispositions(): Observable<MiseADisposition[]> {
    return this.http.get<MiseADisposition[]>(`${this.apiUrl}`);
  }

  getMiseADispositionById(id: number): Observable<MiseADisposition> {
    return this.http.get<MiseADisposition>(`${this.apiUrl}/${id}`);
  }

  saveMiseADisposition(miseADisposition: MiseADisposition): Observable<MiseADisposition> {
    return this.http.post<MiseADisposition>(this.apiUrl, miseADisposition);
  }

  updateMiseADispositionStatus(id: number, status: string): Observable<MiseADisposition> {
    return this.http.put<MiseADisposition>(`${this.apiUrl}/${id}/status`, { status });
  }

  updateMiseADispositionLivrerState(id: number, livrer: boolean): Observable<MiseADisposition> {
    return this.http.put<MiseADisposition>(`${this.apiUrl}/${id}/livrer`, { livrer });
  }

  deleteMiseADisposition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
