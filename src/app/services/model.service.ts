import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private modalurl = 'http://localhost:3000/models';

  constructor(private http: HttpClient) {}

  getModels(): Observable<any> {
    return this.http.get(this.modalurl);
  }

  addModel(model: any): Observable<any> {
    return this.http.post(this.modalurl, model);
  }
}
