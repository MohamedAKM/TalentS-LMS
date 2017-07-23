import { Component, OnInit  } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
export class User {
  ssn: string;
  password: string;
  error: string;
}
@Component({
    selector: 'login',
    moduleId:module.id,
    templateUrl: `login.html`
})
export class LoginComponent implements OnInit{
      user: User;
      successMessage: String; 
      errorMessage: String; 


    constructor(private auth: AuthService, private router:Router) { }

  ngOnInit() {
    this.user = {
      ssn: '',
      password: '',
      error:''
    };
  }

 get diagnostic() {
    return JSON.stringify(this.user);
  }
    login() {
      this.user.ssn = this.user.ssn.toLowerCase();
      this.errorMessage='';
        console.log(this.user);
        this.auth.login(this.user).subscribe(
          data => {
             //this.router.navigate(['/users']);
             console.log(data);
             if(data['success'] == false){
                this.errorMessage = data['message'];  
             }
          }, 
          err => {
            this.errorMessage = err; 
            console.log(err);
          });
       // console.log(result);
        //this.user.error = result;
    }
}