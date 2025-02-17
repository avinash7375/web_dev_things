// src/app/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: false // Add this line
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup; // Add the ! operator
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}