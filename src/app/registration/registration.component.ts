import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../shared/password.validator'
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  alreadyExists = false;
  loading = false;

  registrationform = this.fb.group({
    username: ['', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$')
    ])],
    confirmpassword: ['', Validators.required],
    role: ['', [Validators.required]]
  }, { validator: PasswordValidator })

  constructor(private fb: FormBuilder,
    private registration: RegistrationService,
    private login: LoginService,
    private router: Router) { }


  ngOnInit() {
  }

  async onSubmit(form) {
    try {
      this.loading = true;
      const res = await this.registration.register(form);
      if (!res.error) {
        const res1 = await this.login.login(form);
        if (res1.token) {
          localStorage.setItem('loginToken', res1.token);
          this.router.navigate(['/userdashboard']);
        }

      } else {
        this.alreadyExists = true;
        this.loading = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

}
