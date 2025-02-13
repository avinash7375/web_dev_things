// Step 1: Install Angular CLI (Skip if already installed)
// npm install -g @angular/cli

// Step 2: Create a new Angular project
// ng new angular-login-app
// cd angular-login-app

// Step 3: Generate Components & Services
// ng generate component login
// ng generate service auth

// Step 4: Implement Login Component (src/app/login/login.component.ts)
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  login() {
    if (this.authService.authenticate(this.username, this.password)) {
      this.message = 'Login Successful!';
    } else {
      this.message = 'Invalid Credentials';
    }
  }
}

// Step 5: Implement Login Template (src/app/login/login.component.html)
// <div>
//   <h2>Login</h2>
//   <input type="text" placeholder="Username" [(ngModel)]="username" />
//   <input type="password" placeholder="Password" [(ngModel)]="password" />
//   <button (click)="login()">Login</button>
//   <p>{{ message }}</p>
// </div>

// Step 6: Implement Auth Service (src/app/auth.service.ts)
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private validUser = { username: 'admin', password: 'admin' };

  authenticate(username: string, password: string): boolean {
    return username === this.validUser.username && password === this.validUser.password;
  }
}
