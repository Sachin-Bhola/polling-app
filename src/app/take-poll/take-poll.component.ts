import { Component, OnInit } from '@angular/core';
import { TakePollService } from './take-poll.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-take-poll',
  templateUrl: './take-poll.component.html',
  styleUrls: ['./take-poll.component.css']
})

export class TakePollComponent implements OnInit {

  constructor(private takePolls: TakePollService,
    public fb: FormBuilder) { }

  // current page of items
  pageOfItems: Array<any>;
  // array of all items to be paged
  items: Array<any>;
  loading = false;
  optionVal = '';
  tempId: number;
  tempOpt: any;
  loaderID;
  votedPolls = [];

  ngOnInit() {
    this.getPolls();
    this.votedPolls = JSON.parse(localStorage.getItem('voted')) || [];
  }

  postRadioValue(id, option) {
    this.tempId = id;
    this.tempOpt = option;
  }

  onSubmit() {
    this.loaderID = this.tempId;
    this.takePolls.vote(this.tempId, this.tempOpt);
    this.votedPolls.push(this.tempId);
    localStorage.setItem('voted', JSON.stringify(this.votedPolls));
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  async getPolls() {
    this.loading = true;
    try {
      const res = await this.takePolls.getPoll();
      this.items = res && res['data'];
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }
}
