import { CommonModule } from '@angular/common';
import { AuthService, UserConsts } from '@teresitaya/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-account',
  standalone: true,
  imports: [
    CommonModule,
    FocusTrapModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
    CardModule,
    
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  title = UserConsts.USER_ID + ' Account';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  saving = false;

  private generateToken(email: string, password: string): string {
    // Create a timestamp for token uniqueness
    const timestamp = new Date().getTime();
    
    // Combine email, password and timestamp
    const rawToken = `${email}:${password}:${timestamp}`;
    
    // Convert to base64 and remove any non-alphanumeric characters
    return btoa(rawToken)
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 32); // Limit token length
  }

  validateForm() {
    this.loginForm.markAllAsTouched();
  }

  onSubmit() {
    this.validateForm();
    if (this.loginForm.valid) {
      this.saving = true;
      const { email, password } = this.loginForm.value;
      
      // Simulate API call
      setTimeout(() => {
        if (email && password) {
          const token = this.generateToken(email, password);
          this._authService.setToken(token);
          this._router.navigate(['/dashboard']);
        }
        this.saving = false;
      }, 1000);
    }
  }
}
