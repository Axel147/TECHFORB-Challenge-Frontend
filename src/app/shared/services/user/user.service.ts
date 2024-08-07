
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { USER_URL } from '../../routes/routes';
import { IUserRegister, IUserResponse } from '../../interfaces/iUserRegister';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() {}

  // CREAR USUARIO
  /*
  newUser(userValue: IUserRegister): Observable<IUserResponse | void> {
    return this.http.post<IUserResponse>(USER_URL, userValue).pipe(catchError(this.handlerUserError));
  }

  handlerUserError(error: any): Observable<never> {
    let errorMessage = 'Error';
    if (error) {
      errorMessage = `Error desde el service: ${error.message}`;
    }
    return throwError(() => (errorMessage));
  }*/
}
