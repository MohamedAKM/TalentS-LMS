import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { WebService } from './web.service';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styles: [`
        .error {
            background-color: #fff0f0
        }
    `]
})
export class RegisterComponent {
    form;
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
    defGroupid="";
    MyBloodType ="A+";
    bts=[{title:"A+"},{title:"B+"},{title:"A"},{title:"B"}];
    MyGender ="Male";
    genderList=[{title:"Male"},{title:"Female"}];

    MyEducation ="Middle School";
    educationLevel=[{title:"Middle School"},{title:"High School"}];

     ngOnInit(){
         var ssn; 
        this.webService.getGroups();

        this.webService.getUser(ssn).subscribe( res => {
            this.currentUser = res;
           // console.log(this.currentUser);
        })
         
     }
    constructor(private webService: WebService,private fb: FormBuilder, private auth : AuthService) {

        

        this.form = fb.group({
            fullName: ['', Validators.required],
            dob: ['', Validators.required],
            education: ['', Validators.required],
            ssn: ['', Validators.required],
            mobile: ['', Validators.required],
            fatherMobile: ['', Validators.required],
            location: ['', Validators.required],
            photo: ['', Validators.required],
            bloodType: ['', Validators.required],
            interest: ['', Validators.required],
            gender: ['', Validators.required],
            medicalCondition: [''],
            bio: [''],
            lang: ['English'],
            groupid: ['',Validators.required],
            email: ['', [Validators.required, emailValid()]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: matchingFields('password', 'confirmPassword') })
    }

    onSubmit() {
        console.log(this.form.errors);
        this.auth.register(this.form.value);
    }

    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched
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
