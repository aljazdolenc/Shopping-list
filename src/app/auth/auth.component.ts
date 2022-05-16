import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode:boolean = true;
  isLoading: boolean = false;
  loginForm: FormGroup;
  error: string = null;
  

  constructor(
    private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }
  ngOnDestroy(): void {
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    this.error=null;
    let authObs:Observable<AuthResponseData>

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.loginRequest(this.loginForm)
    } else {
      authObs = this.authService.signupRequest(this.loginForm)
    }
      authObs.subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/recipes']) 
      },
      (error) => {
        this.error=error
        this.isLoading = false;
      }
    )
    this.loginForm.reset()
  }
  onHandleError(){
    this.error=null;
  }
}
