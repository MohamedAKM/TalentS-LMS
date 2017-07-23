import { Component } from '@angular/core';
import { WebService } from './web.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl:'edit.profile.html',
    styles: [`
        .error {
            background-color: #fff0f0
        }
    `]
/*    template: `
        <md-card class="card">
            <md-input-container>
                <input mdInput [(ngModel)]="model.fullName" placeholder="Full Name">
            </md-input-container>
            <md-input-container>
                <input mdInput [(ngModel)]="model.education" placeholder="Education">
            </md-input-container>
            <button md-raised-button color="primary" (click)="saveUser(model)">Save Changes</button>
        </md-card>
    `*/
})
export class UserComponent {


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

    constructor(private fb: FormBuilder,private router:Router, private webService : WebService, private route : ActivatedRoute) {

        

        this.form = fb.group({
            fullName: [''],
            dob: [''],
            education: [''],
            ssn: [''],
            mobile: [''],
            fatherMobile: [''],
            location: [''],
            photo: [''],
            bloodType: [''],
            interest: [''],
            gender: [''],
            bio: [''],
            lang: ['English'],
            email: [''],
            medicalCondition: [''],
            password: ['']
        })
    }
    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched
    }

    

    ngOnInit() {
        var ssn = this.route.snapshot.params.ssn;
        console.log('ssn:' + ssn);
        this.webService.getUser(ssn).subscribe( res => {
            this.model.fullName = res.fullName;
            this.model.ssn = res.ssn;
            this.model.medicalCondition = res.medicalCondition;
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

    saveUser(userData) {
        if (userData.password) {
            // code...
           // delete userData.password;
        }
        this.webService.saveUser(userData).subscribe(userData);
        
    }
}

function matchingFields(field1, field2) {
    return form => {
        if (form.controls[field1].value !== form.controls[field2].value)
            return { mismatchedFields: true }
    }
}

function emailValid() {
    return control => {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return regex.test(control.value) ? null : { invalidEmail: true }
    }
}
