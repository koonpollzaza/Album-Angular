import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import Album from '../../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  readonly baseURL = 'https://localhost:7058/Album'; // ใช้ path หลัก

  constructor(private http: HttpClient) {}

  getAll(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.baseURL}/GetAll_Album`).pipe(catchError(this.errorHandler));
  }

  get(id: number | string): Observable<Album> {
    return this.http.get<Album>(`${this.baseURL}/${id}`).pipe(catchError(this.errorHandler));
  }

  create(formData: FormData): Observable<any> {
  return this.http.post<any>(`${this.baseURL}/Create`, formData)
    .pipe(catchError(this.errorHandler));
}

 update(formData: FormData): Observable<any> {
  return this.http.put<any>(`${this.baseURL}/Update`, formData);
}

  delete(id: number | string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any) {
    let errorMessage = '';
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText}`;
    }
    return throwError(() => errorMessage);
  }
}