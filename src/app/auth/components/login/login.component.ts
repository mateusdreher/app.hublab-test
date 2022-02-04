import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  validForm(): boolean {
    console.log(this.form);
    if (!this.form.valid) {
      alert('Verifique os campos');
      return false;
    }
    return true;
  }

  login() {
    if (!this.validForm()) {
      return;
    }

    this.authService.auth({email: this.form.value.email, password: this.form.value.password}).subscribe(
      (data) => {
        this.authService.setCurrentUserSessionValue(data.token, false);
        this.router.navigate(['']);
      },
      (error) => {
        alert('Erro no login');
        console.error(error);
      }
    );
  }

}
