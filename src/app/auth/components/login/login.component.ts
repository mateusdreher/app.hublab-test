import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastType } from 'src/app/shared/types/toast.type';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  toast: ToastType = {
    show: false,
    text: '',
    class: ''
  };
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
      this.toast.show = true;
      this.toast.text = 'Verifique os campos';
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
        this.authService.setCurrentUserSessionValue({token: data.token, user: data.user, expired: false});
        this.router.navigate(['/chat']);
      },
      (error) => {
       this.toast.show = true;
       this.toast.text = error.error || 'Erro no login';
        console.error(error);
      }
    );
  }

}
