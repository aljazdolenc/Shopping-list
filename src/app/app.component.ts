import { AuthService } from './auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title='Hello';


  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
