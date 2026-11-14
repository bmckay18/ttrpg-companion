import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth/auth-service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);

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
    };

    this.router.navigate(['/app/campaigns'])
  }
}
