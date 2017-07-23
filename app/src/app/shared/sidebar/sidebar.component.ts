import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { WebService } from '../../web.service';
@Component({
  selector: 'ma-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

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
            this.currentUser.fullName = res.fullName;
            this.currentUser.ssn = res.ssn;
            this.currentUser.education = res.education;
            this.currentUser.mobile = res.mobile;
            this.currentUser.fatherMobile = res.fatherMobile;
            this.currentUser.email = res.email;
            this.currentUser.bio = res.bio;
            this.currentUser.dob = res.dob;
            this.currentUser.location = res.location;
            this.currentUser.interest = res.interest;
            this.currentUser.bloodType = res.bloodType;
            this.currentUser.gender = res.gender;
            this.currentUser.groupid = res.groupid;
        })
    }
	constructor(private auth: AuthService, private webService:WebService){}


}


