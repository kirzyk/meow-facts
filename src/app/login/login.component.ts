import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    NgOptimizedImage,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    DialogModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public showRegisterDialog = false;
  public loginLoading = false;
  public registerLoading = false;
  public loginErrorMessage: string | null = null;
  public registerErrorMessage: string | null = null;

  constructor(
    private readonly forbBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.forbBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registerForm = this.forbBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginLoading = true;
      const { login, password } = this.loginForm.value;
      this.authService
        .login(login, password)
        .pipe(take(1))
        .subscribe({
          next: (user) => {
            this.loginErrorMessage = null;
            this.loginLoading = false;
            this.router.navigate(['home']);
          },
          error: (err) => {
            this.loginErrorMessage = err.message || 'Login failed';
            this.loginLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Login Failed',
              detail: this.loginErrorMessage || 'Please try again.',
              life: 3000,
            });
          },
        });
    }
  }

  public onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.registerLoading = true;
      const { email, password } = this.registerForm.value;
      this.authService
        .register(email, password)
        .pipe(take(1))
        .subscribe({
          next: (user) => {
            this.registerErrorMessage = null;
            this.showRegisterDialog = false;
            this.registerForm.reset();
            this.registerLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Account Created',
              detail: 'Your account has been created successfully!',
              life: 3000,
            });
          },
          error: (err) => {
            this.registerErrorMessage = err.message || 'Registration failed';
            this.registerLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Registration Failed',
              detail: this.registerErrorMessage || 'Please try again.',
              life: 3000,
            });
          },
        });
    }
  }

  public openRegisterDialog(): void {
    this.showRegisterDialog = true;
  }

  public closeRegisterDialog() {
    this.showRegisterDialog = false;
    this.registerForm.reset();
    this.registerErrorMessage = null;
  }
}
