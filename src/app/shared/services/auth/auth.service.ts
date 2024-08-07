import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { UserLogin, UserResponse } from '../../interfaces/iUser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { USER_LOGIN_URL } from '../../routes/routes';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user = new BehaviorSubject<UserResponse>(null!);
  isLogged:boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.checkToken();
  }

  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  userValue(): UserResponse {
    const user = JSON.parse(localStorage.getItem('user')!) || null;
    return user;
  }

  login(authData: UserLogin): Observable<UserResponse | void>{
    return this.http.post<UserResponse>(USER_LOGIN_URL, authData).pipe(
      map((user: UserResponse) => {
        this.toastrService.success(`Bienvenido/a al Portal de Monitoreo ${user.name} ${user.lastname}`, 'Acceso Permitido');
        this.saveLocalStorage(user);
        this.user.next(user);
        this.isLogged = true;
        return user;
      }),
      catchError((error) => this.handlerError(error))
    );
  }

  logout(): void{
    localStorage.removeItem('user');
    this.user.next(null!);
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

  private checkToken(): void{
    const user = JSON.parse(localStorage.getItem('user')!) || null;

    if(user){
      const isExpired = helper.isTokenExpired(user.token);

      if(isExpired){
        this.logout();
      } else {
        this.user.next(user);
        this.isLogged = true;
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void{
    const { name, lastname, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private handlerError(error: any): Observable<never>{
    let errorMessage = 'Un error';
    if(error){
      errorMessage = `Error: code ${error.message}`
      console.log('error: ', errorMessage)
      this.toastrService.error('Email y/o contraseña invalida', 'Acceso Denegado')
    }
    return throwError(() => errorMessage);
  }
}
