import { Injectable } from '@angular/core';
import { Leveefond }from '../models/leveefond'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LeveefondService {

  constructor(private http: HttpClient) { }
  addlf(service: Leveefond): Observable<any>{
    return this.http.post<any>('http://localhost:8080/leveefond', service);

  }
}
