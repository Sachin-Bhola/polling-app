import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreatePollService } from './create-poll.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  poll = false;

  constructor(private fb: FormBuilder,
    private createPoll: CreatePollService) { }

  createpoll = this.fb.group({
    title: ['', [Validators.required]],
    option: this.fb.group({
      opt1: ['', [Validators.required]],
      opt2: [''],
      opt3: [''],
      opt4: ['']
    })
  })


  ngOnInit() {
  }

  onSubmit(form) {
    try {
      this.poll = true;
      const res = this.createPoll.createPoll(form);
      if (res) {
        setTimeout(() => {
          this.poll = false;
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
