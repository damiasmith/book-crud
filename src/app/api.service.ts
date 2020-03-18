import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from './book';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }

    getBooks(): Observable<Book[]> {
      return this.http.get<Book[]>(apiUrl)
        .pipe(
          tap(books => console.log('fetched Books')),
          catchError(this.handleError('getBooks', []))
        );
    }
    getBook(id: number): Observable<Book> {
      const url = `${apiUrl}/${id}`;
      return this.http.get<Book>(url).pipe(
        tap(_ => console.log(`fetched Book id=${id}`)),
        catchError(this.handleError<Book>(`getBook id=${id}`))
      );
    }

    addBook(book: Book): Observable<Book> {
      return this.http.post<Book>(apiUrl, book, httpOptions).pipe(
        tap((bk: Book) => console.log(`added Book w/ id=${bk._id}`)),
        catchError(this.handleError<Book>('addBook'))
      );
    }

    updateBook(id: any, book: Book): Observable<any> {
      const url = `${apiUrl}/${id}`;
      return this.http.put(url, book, httpOptions).pipe(
        tap(_ => console.log(`updated Book id=${id}`)),
        catchError(this.handleError<any>('updateBook'))
      );
    }

    deleteBook(id: any): Observable<Book> {
      const url = `${apiUrl}/${id}`;
      return this.http.delete<Book>(url, httpOptions).pipe(
        tap(_ => console.log(`deleted Book id=${id}`)),
        catchError(this.handleError<Book>('deleteBook'))
      );
    }
  }

