import { Injectable } from '@angular/core';
import { Model } from './admin-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http:HttpClient) { }

  getModels() {
    return this.http.get<Model[]>('http://localhost:5282/api/Model');
  }

  createModel(model: any) {
    return this.http.post('http://localhost:5282/api/Model', model);
  }

  deleteModel(modelId: number) {
    return this.http.delete('http://localhost:5282/api/Model/' + modelId);
  }

  getModel(modelId: number) {
    return this.http.get<Model>('http://localhost:5282/api/Model/' + modelId);
  }

  updateModel(model: any) {
    return this.http.put('http://localhost:5282/api/Model/' + model.modelId, model);
  }
}
