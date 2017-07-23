import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl:'user.profile.html'
})
export class UserProfileComponent {


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
            medicalCondition:'',
            password: ''
    }

    form;

    MyBloodType ="A+";
    bts=[{title:"A+"},{title:"B+"},{title:"A"},{title:"B"}];
    MyGender ="Male";
    genderList=[{title:"Male"},{title:"Female"}];

    MyEducation ="Middle School";
    educationLevel=[{title:"Middle School"},{title:"High School"}];

    constructor(private webService : WebService,private route: ActivatedRoute) {

       
    }
    
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
            this.model.medicalCondition = res.medicalCondition;
        })
    }
}
