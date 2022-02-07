import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericObjectType } from 'src/app/shared/types/generic-object.type';
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
    if (!this.form.valid) {
      alert('Verifique os campos');
      return false;
    }
    if (this.form.value.password !== this.form.value.confirmPassword) {
      alert('Senhas diferentes');
      return false;
    }
    if (this.form.value.email !== this.form.value.confirmEmail) {
      alert('Emails diferntes');
      return false;
    }

    return true;
  }

  validInput(input: string, event: any) {
    console.log('EVENTO', event.target.value);
    
    if (this.form.value[input] !== event.target.value) {
      this.validInputs[input] = false;
    }
    else {
      this.validInputs[input] = true;
    }
  }
  
  register() {
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
        alert('Erro ao criar o usuário');
      }
    )
  }
}
