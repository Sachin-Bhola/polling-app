import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform = this.fb.group({
    username: ['', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])],
    password: ['', Validators.compose([

      Validators.required,
      Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$')
    ])],
  })
  constructor(private fb: FormBuilder, private router: Router, public loginService: LoginService) { }

  userNotExists = false;
  loading = false;

  ngOnInit() {
  }

  async onSubmit(form) {
    try {
      this.loading = true;
      const res = await this.loginService.login(form);
      if (res.token) {
        localStorage.setItem('loginToken', res.token);
        this.router.navigate(['/userdashboard']);
      }
      else {
        this.userNotExists = true;
        this.loading = false;
      }

    } catch (error) {
      console.log(error);
    }
  }



}
