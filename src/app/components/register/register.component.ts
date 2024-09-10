import { Component, OnDestroy, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  // Call Services
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  // Variable to Store Data
  messageError: string = '';
  messageSuccess: boolean = false;
  isLoading: boolean = false;
  visible: boolean = true;
  changeType: boolean = true;
  visibleRe: boolean = true;
  changeTypeRe: boolean = true;

  // Create Variable to UnSubscribe
  registerSub!: Subscription;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null, Validators.required],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.confirmPassword }
  );

  // Custom Validation Function
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  registerSubmit(): void {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this.registerSub = this._AuthService
        .setRegisterForm(this.registerForm.value)
        .subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.messageError = '';
              this.messageSuccess = true;
              setTimeout(() => {
                this._Router.navigate(['/login']);
              }, 1500);
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

    viewRePass() {
    this.visibleRe = !this.visibleRe;
    this.changeTypeRe = !this.changeTypeRe;
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }
}
