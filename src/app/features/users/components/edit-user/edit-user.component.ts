import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpProviderService } from '../../../../core/services/http-provider.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  templateUrl: './edit-user.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EditUserComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly httpProvider = inject(HttpProviderService);

  userForm!: FormGroup;
  userId!: number;
  isSubmitted = false;

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.initForm();
    this.loadUserData();
  }

  private initForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      rut: ['', Validators.required],
      dv: ['', Validators.required],
      birthDate: ['', Validators.required],
      emailAddress: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private loadUserData() {
    this.httpProvider.getUserById(this.userId).subscribe({
      next: (user) => {
        if (user) {
          this.userForm.patchValue(user);
        }
      },
      error: () => this.toastr.error('Error al cargar el usuario'),
    });
  }

  saveUser() {
    this.isSubmitted = true; 
    if (this.userForm.invalid) return;
  
    const updatedUser = this.userForm.getRawValue();
  
    this.httpProvider.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado correctamente');
        this.router.navigate(['users', 'home']);
      },
      error: () => this.toastr.error('Error al actualizar el usuario'),
    });
  }
}
