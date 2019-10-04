import { ViewpollService } from './viewpoll.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {


  // current page of items
  pageOfItems: Array<any>;
  // array of all items to be paged
  items: Array<any>

  loading = false;
  tempTitle;
  tempPoll;
  tempAddOption;
  showDeleting;
  deleOption;


  ngOnInit() {
    this.viewpolls();
  }
  constructor(private viewpoll: ViewpollService, private fb: FormBuilder) { }

  addOptionForm = this.fb.group({
    newoption: ["", [Validators.required]]
  })

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  async viewpolls() {
    this.loading = true;
    try {
      const response = await this.viewpoll.getPoll();
      this.items = response && response['data'];
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  }

  async deletepoll(poll) {
    this.showDeleting = poll._id;
    try {
      const response = await this.viewpoll.deletepoll(poll);
      this.items = this.items.filter(pollele => pollele._id !== poll._id);

    } catch (error) {
      console.log(error);
    }
  }

  async deleteOpt(poll, option) {
    this.deleOption = option;
    try {
      const response = await this.viewpoll.deleteoption(poll, option);
      this.items.forEach(pollele => {
        if (pollele._id === poll._id) {
          pollele.options = pollele.options.filter(optionele => optionele.option != option);
        }
        this.deleOption = "false";
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  async  editpoll(poll, pollname) {
    try {
      await this.viewpoll.editpoll(poll, pollname);
      this.items.forEach(pollele => {
        if (pollele._id === poll._id) {
          pollele.title = pollname;
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async addOption(poll, newOption) {
    try {

      await this.viewpoll.addOption(poll, newOption.value);
      this.items.forEach(pollele => {
        if (pollele._id === poll._id) {
          pollele.options.push({ option: newOption.value, vote: 0 });
        }
      })
    } catch (error) {
      console.log(error);

    }
  }

  getTitleAndID(title, poll) {
    this.tempTitle = title;
    this.tempPoll = poll;
  }

  addOptionId(poll) {
    this.tempAddOption = poll;
  }
}

