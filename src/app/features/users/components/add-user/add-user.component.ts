import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpProviderService } from '../../../../core/services/http-provider.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly httpProvider = inject(HttpProviderService);
  private readonly toastr = inject(ToastrService);

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  isSubmitted = signal(false);

  AddUser() {
    this.isSubmitted.set(true);
    if (this.userForm.valid) {
      this.httpProvider.saveUser(this.userForm.value).subscribe({
        next: (response) => {
          this.toastr.success('User added successfully!');
          setTimeout(() => this.router.navigate(['users', 'home']), 500);
        },
        error: (error) => {
          this.toastr.error(error.message || 'Something went wrong');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/users/home']);
  }  
}
