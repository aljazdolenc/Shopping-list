import { AuthService } from './../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) { }

  getDataSub: Subscription;
  saveDataSub: Subscription;
  loginStatusSub: Subscription;
  loginStatus: boolean = false;

  saveData() {
    this.saveDataSub = this.dataStorageService.saveDataRequest().subscribe();
  }

  getData() {
    this.getDataSub = this.dataStorageService.getDataRequest().subscribe(
      (response)=>{
        if(!response){
          alert("You haven't saved any recepies yet");
        }
      });
  }

  logout() {
    this.authService.logOut()
  }

  ngOnInit(): void {
    this.loginStatusSub = this.authService.user
      .subscribe((user) => {
        this.loginStatus = !!user;
      });
  }

  ngOnDestroy(): void {
    this.getDataSub.unsubscribe();
    this.saveDataSub.unsubscribe();
    this.loginStatusSub.unsubscribe();
  }

}
