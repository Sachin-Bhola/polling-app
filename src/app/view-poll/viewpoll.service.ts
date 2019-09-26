import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewpollService {

  constructor(private http: HttpClient) { }


  getPoll(): Promise<any> {
    return this.http.get(`${environment.apiBase}/list_polls`).toPromise();
  }

  deletepoll(poll): Promise<any> {
    return this.http.get(`${environment.apiBase}/delete_poll?id=${poll._id}`).toPromise();
  }
  deleteoption(poll, option): Promise<any> {
    return this.http.get(`${environment.apiBase}/delete_poll_option?id=${poll._id}&option_text=${option}`).toPromise();

  }

  editpoll(poll, pollname): Promise<any> {
    return this.http.get(`${environment.apiBase}/update_poll_title?id=${poll._id}&title=${pollname}`).toPromise();
  }

  addOption(poll, newOption): Promise<any> {
    return this.http.get(`${environment.apiBase}/add_new_option?id=${poll._id}&option_text=${newOption}`).toPromise();
  }

}
