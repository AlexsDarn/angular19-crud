import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpProviderService {
  private readonly apiUrl = environment.apiUrl;
  private readonly webApiService = inject(WebApiService);

  getAllUser(): Observable<any> {
    return this.webApiService.get(`${this.apiUrl}`);
  }

  deleteUserById(userId: number): Observable<any> {
    return this.webApiService.delete(`${this.apiUrl}/${encodeURIComponent(userId)}`); // o un post para borrado lógico
  }

  getUserById(userId: number): Observable<any> {
    return this.webApiService.get(`${this.apiUrl}/${encodeURIComponent(userId)}`);
  }

  saveUser(model: any): Observable<any> {
    return this.webApiService.post(`${this.apiUrl}`, model);
  }

  updateUser(userId: number, model: any): Observable<any> {
    return this.webApiService.put(`${this.apiUrl}/${encodeURIComponent(userId)}`, model);
  }
}
