import { NgClass } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, TermtextPipe],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnDestroy {

  // Call Services
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  // Variable to Store Data And Used It Logic
  isLoading: boolean = false;
  messageError: string = '';
  step: number = 1;

  // Create Variable to UnSubscribe
  verifyEmailSub!: Subscription;
  verifyCodeSub!: Subscription;
  resetPasswordSub!: Subscription;


  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  });

  resetPassword: FormGroup = this._FormBuilder.group({
    email:[],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  verifyEmailSubmit(): void {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    this.isLoading = true;
    if (this.verifyEmail.valid) {
      this.verifyEmailSub = this._AuthService
        .setEmailVerify(this.verifyEmail.value)
        .subscribe({
          next: (res) => {
            if (res.statusMsg === 'success') {
              this.messageError = '';
              this.step = 2;
            }
            this.isLoading = false;
          },
          error: (err) => {
            this.messageError = err.error.message;
            this.isLoading = false;
          },
        });
    }
  }

  verifyCodeSubmit(): void {
    this.isLoading = true;
    if (this.verifyCode.valid) {
      this.verifyCodeSub = this._AuthService
        .setCodeVerify(this.verifyCode.value)
        .subscribe({
          next: (res) => {
            if (res.status === 'Success') {
              this.messageError = '';
              this.step = 3;
            }
            this.isLoading = false;
          },
          error: (err) => {
            this.messageError = err.error.message;
            this.isLoading = false;
          },
        });
    }
  }

  resetPasswordSubmit(): void {
    this.isLoading = true;
    if (this.resetPassword.valid) {
      this.resetPasswordSub = this._AuthService
        .setResetPassword(this.resetPassword.value)
        .subscribe({
          next: (res) => {
            // 1 - Save Token
            localStorage.setItem('userToken', res.token);

            // 2 - Dcode Token
            this._AuthService.saveUserData();

            // 3 - Navigate to home
            this._Router.navigate(['/home']);
            if (res.status === 'Success') {
              this.messageError = '';
            }
            this.isLoading = false;
          },
          error: (err) => {
            this.messageError = err.error.message;
            this.isLoading = false;
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.verifyEmailSub?.unsubscribe();
    this.verifyCodeSub?.unsubscribe();
    this.resetPasswordSub?.unsubscribe();
  }
}
