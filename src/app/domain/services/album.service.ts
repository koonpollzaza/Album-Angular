import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import Album from '../../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  readonly baseURL = 'https://localhost:7058/Album/GetAll_Album'; // เปลี่ยน URL ให้ตรงกับ API จริง

  constructor(private http: HttpClient) {}

  getAll(): Observable<Album[]> {
    return this.http.get<Album[]>(this.baseURL).pipe(catchError(this.errorHandler));
  }

  get(id: number | string): Observable<Album> {
    return this.http.get<Album>(`${this.baseURL}/${id}`).pipe(catchError(this.errorHandler));
  }

  create(album: Album): Observable<Album> {
    return this.http.post<Album>(this.baseURL, album).pipe(catchError(this.errorHandler));
  }

  update(id: number | string, album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.baseURL}/${id}`, album).pipe(catchError(this.errorHandler));
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