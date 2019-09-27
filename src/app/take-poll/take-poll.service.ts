import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TakePollService {

  constructor(private http: HttpClient) { }

  getPoll(): Promise<any> {
    return this.http.get(`${environment.apiBase}/list_polls`).toPromise();
  }
}
