import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  // Call Services
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  // Variable to Store Data
  messageError: string = '';
  messageSuccess: boolean = false;
  isLoading: boolean = false;
  loginSub!: Subscription;
  visible: boolean = true;
  changeType: boolean = true;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginSubmit(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.loginSub = this._AuthService
        .setLoginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            if (res.message === 'success') {
              // 1 - Save Token
              localStorage.setItem('userToken', res.token);

              // 2 - Dcode Token
              this._AuthService.saveUserData();

              this.messageError = '';
              this.messageSuccess = true;

              // 3 - Navigate to home
              setTimeout(() => {
                this._Router.navigate(['/home']);
              }, 1400);
            }
            this.isLoading = false;
          },

          error: (err: HttpErrorResponse) => {
            this.messageError = err.error.message;
            this.isLoading = false;
          },
        });
    }
  }

  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
