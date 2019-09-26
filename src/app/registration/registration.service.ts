import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private http: HttpClient) { }

  register(body): Promise<any> {
    return this.http.get(`${environment.apiBase}/add_user?username=${body.username}&password=${body.password}&role=${body.role}`).toPromise();
  }

}
