import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpProviderService } from '../../../../core/services/http-provider.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-view-user',
  standalone: true,
  templateUrl: './view-users.component.html',
  imports: [CommonModule, RouterModule],
})
export class ViewUsersComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly httpProvider = inject(HttpProviderService);

  userId!: number;
  userDetail: any = null;

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.userId = Number(params['userId']);
          return this.userId ? this.httpProvider.getUserById(this.userId) : of(null);
        })
      )
      .subscribe({
        next: user => {
          if (user) {
            this.userDetail = user;
          }
        },
        error: () => this.toastr.error('Error al cargar el usuario'),
      });
  }
}
