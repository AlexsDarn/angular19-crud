import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WebApiService {
  private readonly http = inject(HttpClient);

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get(url: string): Observable<any> {
    return this.http.get(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  post(url: string, model: any): Observable<any> {
    return this.http.post(url, model, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  put(url: string, model: any): Observable<any> {
    return this.http.put(url, model, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error en la API:', error);
    return throwError(() => new Error(error.message || 'Error desconocido'));
  }
}
