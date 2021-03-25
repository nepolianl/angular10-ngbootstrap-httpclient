import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url: string, _params: any): Observable<any> {
    let httpOptions = {
      headers: this.httpHeaders(),
      params: _params
    };
    return this.http.get<any>(url, httpOptions);
  }

  post(url: string, _requestBody: any): Observable<any> {
    let httpOptions = {
      headers: this.httpHeaders()
    };
    return this.http.post<any>(url, _requestBody, httpOptions);
  }

  httpHeaders() {
    let headers = new HttpHeaders({

    });
    return headers;
  }
}
