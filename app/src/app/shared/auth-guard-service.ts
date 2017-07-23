import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { WebService } from '../web.service'
import { AuthService } from '../auth.service'
import { Router, ActivatedRoute } from '@angular/router'


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

 currentUser = {
            fullName: '',
            dob: '',
            education: '',
            ssn: '',
            gender:'',
            mobile: '',
            fatherMobile: '',
            location: '',
            photo:'',
            bloodType:'',
            interest: '',
            bio: '',
            facebook:'',
            twitter: '',
            instagram: '',
            lang: ['English'],
            email: '',
            groupid:'',
            password: ''
    }
	constructor(private webService: WebService, private router: Router, private route: ActivatedRoute){}
	
  canActivate() {
  	var ssn;
	this.webService.getUser(ssn).subscribe( res => {
        this.currentUser = res; 
            console.log("guard:"+this.currentUser.password.length);
           if (this.currentUser.password.length <= 0) this.router.navigate(['/user']); 

    })
      return true;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}