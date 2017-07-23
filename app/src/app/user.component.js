"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const web_service_1 = require("./web.service");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const router_2 = require("@angular/router");
let UserComponent = class UserComponent {
    constructor(fb, router, webService, route) {
        this.fb = fb;
        this.router = router;
        this.webService = webService;
        this.route = route;
        this.model = {
            fullName: '',
            dob: '',
            education: '',
            ssn: '',
            gender: '',
            mobile: '',
            fatherMobile: '',
            location: '',
            photo: '',
            bloodType: '',
            interest: '',
            bio: '',
            lang: ['English'],
            email: '',
            medicalCondition: '',
            password: ''
        };
        this.MyBloodType = "A+";
        this.bts = [{ title: "A+" }, { title: "B+" }, { title: "A" }, { title: "B" }];
        this.MyGender = "Male";
        this.genderList = [{ title: "Male" }, { title: "Female" }];
        this.MyEducation = "Middle School";
        this.educationLevel = [{ title: "Middle School" }, { title: "High School" }];
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
        });
    }
    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched;
    }
    ngOnInit() {
        var ssn = this.route.snapshot.params.ssn;
        console.log('ssn:' + ssn);
        this.webService.getUser(ssn).subscribe(res => {
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
        });
    }
    saveUser(userData) {
        if (userData.password) {
            // code...
            // delete userData.password;
        }
        this.webService.saveUser(userData).subscribe(userData);
    }
};
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user',
        templateUrl: 'edit.profile.html',
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
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_2.Router, web_service_1.WebService, router_1.ActivatedRoute])
], UserComponent);
exports.UserComponent = UserComponent;
function matchingFields(field1, field2) {
    return form => {
        if (form.controls[field1].value !== form.controls[field2].value)
            return { mismatchedFields: true };
    };
}
function emailValid() {
    return control => {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(control.value) ? null : { invalidEmail: true };
    };
}
//# sourceMappingURL=user.component.js.map