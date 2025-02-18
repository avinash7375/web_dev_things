I'll provide a complete project structure and code for the Angular forms application.



```markdown
forms/
├── src/
│   ├── app/
│   │   ├── user-form/
│   │   │   ├── user-form.component.ts
│   │   │   ├── user-form.component.html
│   │   │   ├── user-form.component.css
│   │   │   └── user-form.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.spec.ts
│   │   ├── app.module.ts
│   │   ├── app.module.server.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   ├── styles.css
│   ├── main.ts
│   ├── index.html
│   └── favicon.ico
├── package.json
├── tsconfig.json
├── angular.json
└── README.md

```

Now, let's provide the code for each main file:

```typescript
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms';
}

// src/app/app.component.html
<div class="container">
  <h1 class="mt-4 mb-4">Angular Forms Validation</h1>
  <router-outlet></router-outlet>
</div>

// src/app/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^\+?[\d\s-]{10,}$/)
      ]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', [
          Validators.required,
          Validators.pattern(/^\d{5}(-\d{4})?$/)
        ]]
      })
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    console.log('Form submitted:', this.userForm.value);
    // Here you would typically send the data to a server
    
    // Optional: Reset form after successful submission
    // this.userForm.reset();
    // this.submitted = false;
  }

  // Convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }
}

// src/app/user-form/user-form.component.html
<div class="card">
  <div class="card-body">
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <!-- Name Field -->
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input
          type="text"
          id="name"
          formControlName="name"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f['name'].errors }"
        >
        <div *ngIf="submitted && f['name'].errors" class="invalid-feedback">
          <div *ngIf="f['name'].errors['required']">Name is required</div>
          <div *ngIf="f['name'].errors['minlength']">Name must be at least 3 characters</div>
        </div>
      </div>

      <!-- Email Field -->
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          formControlName="email"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f['email'].errors }"
        >
        <div *ngIf="submitted && f['email'].errors" class="invalid-feedback">
          <div *ngIf="f['email'].errors['required']">Email is required</div>
          <div *ngIf="f['email'].errors['email']">Please enter a valid email</div>
        </div>
      </div>

      <!-- Password Field -->
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          formControlName="password"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f['password'].errors }"
        >
        <div *ngIf="submitted && f['password'].errors" class="invalid-feedback">
          <div *ngIf="f['password'].errors['required']">Password is required</div>
          <div *ngIf="f['password'].errors['minlength']">Password must be at least 6 characters</div>
          <div *ngIf="f['password'].errors['pattern']">
            Password must contain at least one uppercase letter, one lowercase letter, and one number
          </div>
        </div>
      </div>

      <!-- Phone Field -->
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input
          type="tel"
          id="phone"
          formControlName="phone"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f['phone'].errors }"
        >
        <div *ngIf="submitted && f['phone'].errors" class="invalid-feedback">
          <div *ngIf="f['phone'].errors['required']">Phone number is required</div>
          <div *ngIf="f['phone'].errors['pattern']">Please enter a valid phone number</div>
        </div>
      </div>

      <!-- Address Fields -->
      <div formGroupName="address">
        <h3 class="h5 mb-3">Address</h3>
        
        <div class="mb-3">
          <label for="street" class="form-label">Street</label>
          <input
            type="text"
            id="street"
            formControlName="street"
            class="form-control"
            [ngClass]="{ 'is-invalid': submitted && userForm.get('address.street')?.errors }"
          >
          <div *ngIf="submitted && userForm.get('address.street')?.errors" class="invalid-feedback">
            <div *ngIf="userForm.get('address.street')?.errors?.['required']">Street is required</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="city" class="form-label">City</label>
          <input
            type="text"
            id="city"
            formControlName="city"
            class="form-control"
            [ngClass]="{ 'is-invalid': submitted && userForm.get('address.city')?.errors }"
          >
          <div *ngIf="submitted && userForm.get('address.city')?.errors" class="invalid-feedback">
            <div *ngIf="userForm.get('address.city')?.errors?.['required']">City is required</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="zipCode" class="form-label">ZIP Code</label>
          <input
            type="text"
            id="zipCode"
            formControlName="zipCode"
            class="form-control"
            [ngClass]="{ 'is-invalid': submitted && userForm.get('address.zipCode')?.errors }"
          >
          <div *ngIf="submitted && userForm.get('address.zipCode')?.errors" class="invalid-feedback">
            <div *ngIf="userForm.get('address.zipCode')?.errors?.['required']">ZIP Code is required</div>
            <div *ngIf="userForm.get('address.zipCode')?.errors?.['pattern']">Please enter a valid ZIP Code</div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <!-- Success Message -->
    <div *ngIf="submitted && userForm.valid" class="alert alert-success mt-3">
      Form submitted successfully!
    </div>
  </div>
</div>

// src/app/user-form/user-form.component.css
.invalid-feedback {
  display: block;
}

.card {
  margin: 20px 0;
}

// src/styles.css
@import 'bootstrap/dist/css/bootstrap.min.css';

/* Additional global styles */
body {
  background-color: #f8f9fa;
  padding: 20px 0;
}

// src/index.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular Forms</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>

```

To run this project:

1. First create a new Angular project:
```bash
ng new forms --no-standalone
```

2. Install Bootstrap:
```bash
npm install bootstrap
```

3. Generate the user-form component:
```bash
ng generate component user-form
```

4. Copy the code provided above into their respective files.

5. Run the application:
```bash
ng serve
```

6. Open your browser and navigate to `http://localhost:4200`

The form includes:
- Name validation (required, min length)
- Email validation (required, email format)
- Password validation (required, min length, pattern)
- Phone validation (required, pattern)
- Address group with street, city, and ZIP code validations
- Bootstrap styling
- Error messages
- Success message on valid submission

Would you like me to:
1. Add more field validations?
2. Implement form submission to a backend?
3. Add form reset functionality?
4. Add more styling or UI improvements?