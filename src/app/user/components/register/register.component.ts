import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericObjectType } from 'src/app/shared/types/generic-object.type';
import { ToastType } from 'src/app/shared/types/toast.type';
import { UserCreateDto } from '../../dtos/user-create.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  validInputs: GenericObjectType = {
    email: true,
    password: true
  }
  toast: ToastType = {
    show: false,
    text: '',
    class: ''
  };
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
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
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.toast.show = true;
      this.toast.text = 'Senhas diferentes';
      this.validInputs['password'] = false;
      return false;
    }
    if (this.form.value.email !== this.form.value.confirmEmail) {
      this.toast.show = true;
      this.toast.text = 'E-mails diferentes';
      this.validInputs['email'] = false;
      return false;
    }

    return true;
  }

  validInput(input: string, event: any) {
    
    if (this.form.value[input] !== event.target.value) {
      this.validInputs[input] = false;
    }
    else {
      this.validInputs[input] = true;
    }
  }
  
  register() {
    if(!this.validForm()) {
      return;
    }
    const dto: UserCreateDto = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name
    }
    this.userService.create(dto).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error)
        this.toast.show = true;
        this.toast.text = error.error || 'Erro ao criar o usuário';
      }
    )
  }
}
