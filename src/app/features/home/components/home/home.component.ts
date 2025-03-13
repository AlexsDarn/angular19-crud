import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpProviderService } from '../../../../core/services/http-provider.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [RouterModule, CommonModule],
})
export class HomeComponent implements OnInit {
  private readonly userListSubject = new BehaviorSubject<any[]>([]);
  userList$: Observable<any[]> = this.userListSubject.asObservable();

  private readonly router = inject(Router);
  private readonly modalService = inject(NgbModal);
  private readonly toastr = inject(ToastrService);
  private readonly httpProvider = inject(HttpProviderService);

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.httpProvider.getAllUser().pipe(
      tap(users => this.userListSubject.next(users)), // Actualiza la lista de usuarios
      catchError(error => {
        console.error("Error en la petición:", error);
        return of([]);
      })
    ).subscribe();
  }

  AddUser() {
    this.router.navigate(['users', 'add-user']); 
  }

  deleteUserConfirmation(user: any) {
    const modalRef = this.modalService.open(PopUpComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.deleteUser(user);
      }
    }).catch(() => {});
  }

  deleteUser(user: any) {
    this.httpProvider.deleteUserById(user.id).pipe(
      tap(() => {
        this.toastr.success('User deleted successfully');
        this.getAllUser(); // Vuelve a cargar la lista sin refrescar la página
      }),
      catchError((error) => {
        this.toastr.error('Error deleting user');
        return of(null);
      })
    ).subscribe();
  }
}
