import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth/auth-service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  http = inject(HttpClient);

  loginForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
    password: new FormControl('', {validators: [Validators.required], nonNullable: true})
  });

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const {email, password} = this.loginForm.getRawValue();

    const {data, error} = await this.authService.signIn(
      email, 
      password
    );

    if (error) {
      console.log('Error', error.message);
      return;
    }

    console.log('Success', data.user);

    const response = await firstValueFrom(
      this.http.get(`${environment.apiUrl}/auth/me`)
    );

    console.log(response);
  }
}
