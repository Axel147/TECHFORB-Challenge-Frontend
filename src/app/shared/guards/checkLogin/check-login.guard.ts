import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, Observable, of, take } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserResponse } from '../../interfaces/iUser';

export const checkLoginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), map((user: UserResponse | null) => {
      if(!user){
        console.log('no permitido');
        return true;
      } else {
        console.log('permitido');
        router.navigate(['/dashboard']);
        return false;
      }
    }),
    catchError((error) => {
      return handleError(error, toastrService);
    })
  );
};

const handleError = (error: any, toastrService: ToastrService): Observable<boolean> => {
  const errorMessage = error ? `Error: code ${error.message}` : `Un error`;
  console.log('Error: ', errorMessage);
  toastrService.error('Email y/o constraseña inválido', 'Acceso Denegado');
  return of(false);
}
