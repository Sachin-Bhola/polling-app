import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatePollService {

  constructor(private http: HttpClient) { }

  createPoll(body): Promise<any> {
    return this.http.get(`${environment.apiBase}/add_poll?title=${body.title}&options=${body.option.opt1}____${body.option.opt2}____${body.option.opt3}____${body.option.opt4}`).toPromise();
  }

}