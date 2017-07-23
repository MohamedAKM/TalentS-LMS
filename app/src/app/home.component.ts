import { Component } from '@angular/core';
import { MessagesComponent } from './messages-component'
import { WebService } from './web.service'
import { Router } from '@angular/router'

@Component({
  selector: 'home',
   moduleId: module.id,
  templateUrl: 'home.html'
})
export class HomeComponent  {


	constructor(private webService: WebService,private router:Router){}
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

		    ngOnInit() {
            var ssn;
            this.webService.getUser(ssn).subscribe( res => {
                this.currentUser = res;
                console.log("homne:"+this.currentUser.password.length);
                if(this.currentUser.password.length <= 0){
                    this.router.navigate(['/user']);
                }
            })
        }
}


