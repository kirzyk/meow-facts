import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

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
  public errorMessage: string | null = null;
  public loginLoading = false;
  public registerLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
            this.errorMessage = null;
            this.loginLoading = false;
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.errorMessage = err.message || 'Login failed';
            this.loginLoading = false;
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
            this.errorMessage = null;
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
            this.errorMessage = err.message || 'Registration failed';
            this.registerLoading = false;
          },
        });
    }
  }

  public openRegisterDialog(): void {
    this.showRegisterDialog = true;
  }

  public closeRegisterDialog() {
    this.showRegisterDialog = false;
  }
}
