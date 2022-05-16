import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
}

interface LoginResponseData {
    kind: string,
    localId: string,
    email: string,
    displayName: string,
    idToken: string,
    refreshToken: string,
    expiresIn: string,
    registered: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationInterval:any;


    constructor(private http: HttpClient, private router:Router) { }

    signupRequest(userForm: FormGroup) {
        const body = {
            'email': userForm.get('email').value,
            'password': userForm.get('password').value,
            'returnSecureToken': true
        }
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
            body)
            .pipe(
                catchError(this.handleError))
    }

    loginRequest(userForm: FormGroup) {
        const body = {
            'email': userForm.get('email').value,
            'password': userForm.get('password').value,
            'returnSecureToken': true
        }
        return this.http.post<LoginResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
            body)
            .pipe(catchError(this.handleError), tap(
                resData => {
                    this.handleAuth(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn)
                }
            ))
    }
    private handleAuth(email: string, id: string, token: string, expiration: number) {
        const expirationDate = new Date(new Date().getTime() + expiration * 1000)
        const user = new User(
            email,
            id,
            token,
            expirationDate
        )
        this.user.next(user)
        localStorage.setItem('userData',JSON.stringify(user))
        this.autoLogOut();
    }
    private handleError(error: HttpErrorResponse) {

        var errorMessage: string = 'Unknown Error';
        if (!error.error || !error.error.error) {
            return throwError(errorMessage)
        }
        switch (error.error.error.message) {
            case 'EMAIL_NOT_FOUND': errorMessage = 'Email was not found'; break;
            case 'INVALID_PASSWORD': errorMessage = 'Email or password is incorrect'; break;
            case 'USER_DISABLED': errorMessage = 'The user has been disabled'; break;
            case 'EMAIL_EXISTS': errorMessage = 'Email already exists'; break;
            case 'OPERATION_NOT_ALLOWED': errorMessage = 'signing in was disabled'; break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER': errorMessage = 'Too many atemps try later'; break;
        }
        return throwError(errorMessage)
    }


    getUserFromLocalStrorage(){
        let userData=JSON.parse(localStorage.getItem('userData'));
        if(userData){
            let userLocal:User=new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );
            return userLocal
        }
        return null;
    }
    autoLogin(){
        let userLocal:User=this.getUserFromLocalStrorage()
        if(userLocal){
            this.user.next(userLocal)
            this.router.navigate(['/recipes'])
            this.autoLogOut()
        }else{
            this.router.navigate(['/auth'])
        }
    }
    autoLogOut(){
        let interval=300000;
        this.tokenExpirationInterval=setInterval(()=>{
            if(this.getUserFromLocalStrorage().token==null){
                this.logOut()
            }
        },interval)
    }
    logOut(){
        this.user.next(null);
        localStorage.removeItem('userData')
        clearInterval(this.tokenExpirationInterval)
        this.router.navigate(['/auth'])
    }
}
