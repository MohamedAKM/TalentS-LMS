import {Component} from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router'
//import { QrScannerComponent } from 'angular2-qrscanner';
//import { QRCodeComponent } from 'angular2-qrcode';

@Component({
  selector: 'id-card',
  template: `
<div class="center">
  <img src="https://www.altis.ch/img/team/male.jpg" class="card-img" alt="" />
  <div class="id-card-info">
	<h1>{{model.fullName}}</h1>
	<h2>Education: {{model.education}}</h2>
	<h2>Birth Date: {{model.dob}}</h2>
  </div>
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={{model.ssn}}" alt="" />
  </div>`
})

export class IdCardComponent {

	    model = {
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
            password: ''
    	}


    constructor(private webService : WebService,private route: ActivatedRoute) {

    }

/*	elementType : 'url' | 'canvas' | 'img' = 'url';
value : string = 'Techiediaries';*/
    ngOnInit() {
        var ssn = this.route.snapshot.params.ssn;
        console.log('ssn:' + ssn);
        this.webService.getUser(ssn).subscribe( res => {
            this.model.fullName = res.fullName;
            this.model.ssn = res.ssn;
            this.model.education = res.education;
            this.model.mobile = res.mobile;
            this.model.fatherMobile = res.fatherMobile;
            this.model.email = res.email;
            this.model.bio = res.bio;
            this.model.dob = res.dob;
            this.model.location = res.location;
            this.model.interest = res.interest;
            this.model.bloodType = res.bloodType;
            this.model.gender = res.gender;
        })
    }
}