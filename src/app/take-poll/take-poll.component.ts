import { Component, OnInit } from '@angular/core';
import { TakePollService } from './take-poll.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-take-poll',
  templateUrl: './take-poll.component.html',
  styleUrls: ['./take-poll.component.css']
})

export class TakePollComponent implements OnInit {

  pageOfItems: Array<any>;
  items: Array<any>;
  loading = false;
  votedPolls = [];
  takePoll;
  selectedOptId;

  constructor(
    private takePolls: TakePollService,
    public fb: FormBuilder
  ) {
    this.votedPolls = JSON.parse(localStorage.getItem('voted')) || [];
  }

  ngOnInit() {
    this.getPolls();
    this.createForm();
  }

  createForm() {
    this.takePoll = this.fb.group({
      selectedOption: [null, [Validators.required]]
    })
  }

  async getPolls() {
    this.loading = true;
    try {
      const res = await this.takePolls.getPoll();
      const items = res && res['data'];
      this.items = items.map(item => {
        return {
          ...item,
          submitted: this.votedPolls.includes(item._id)
        }
      })
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(form, poll) {
    this.takePolls.vote(poll._id, form.value.selectedOption);
    this.votedPolls.push(poll._id);
    localStorage.setItem('voted', JSON.stringify(this.votedPolls));
    this.items.forEach(item => {
      if (item._id === poll._id)
        item.submitted = true;
    });
    console.log(form);
  }

  enableBtn(id) {
    this.selectedOptId = id;
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }



}
