import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'old-nav',
    template: `
        <md-toolbar color="primary">
            <button md-button routerLink="/" *ngIf="auth.role=='admin'" >Dashboard</button>
            <button md-button routerLink="/users" *ngIf="auth.role=='admin'">Users</button>
            <button md-button routerLink="/attendance" *ngIf="auth.role=='admin'">Attendance</button>
            <span style="flex: 1 1 auto"></span>
            <button *ngIf="!auth.isAuthenticated"md-button routerLink="/login" >Login</button>
            <button *ngIf="auth.role=='admin'" md-button routerLink="/register" >New User</button>
            <button *ngIf="auth.isAuthenticated" md-button routerLink="/profile" >Profile</button>                                    
            <button *ngIf="auth.isAuthenticated" md-button routerLink="/user" >Edit Profile</button>                                    
            <button *ngIf="auth.isAuthenticated" md-button (click)="auth.logout()" >Logout</button>                                                
        </md-toolbar>
    `
})
export class NavComponent {
    constructor(private auth: AuthService) {}
}