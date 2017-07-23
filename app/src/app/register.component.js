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
const forms_1 = require("@angular/forms");
const auth_service_1 = require("./auth.service");
const web_service_1 = require("./web.service");
let RegisterComponent = class RegisterComponent {
    constructor(webService, fb, auth) {
        this.webService = webService;
        this.fb = fb;
        this.auth = auth;
        this.currentUser = {
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
            facebook: '',
            twitter: '',
            instagram: '',
            lang: ['English'],
            email: '',
            groupid: '',
            password: ''
        };
        this.defGroupid = "";
        this.MyBloodType = "A+";
        this.bts = [{ title: "A+" }, { title: "B+" }, { title: "A" }, { title: "B" }];
        this.MyGender = "Male";
        this.genderList = [{ title: "Male" }, { title: "Female" }];
        this.MyEducation = "Middle School";
        this.educationLevel = [{ title: "Middle School" }, { title: "High School" }];
        this.form = fb.group({
            fullName: ['', forms_1.Validators.required],
            dob: ['', forms_1.Validators.required],
            education: ['', forms_1.Validators.required],
            ssn: ['', forms_1.Validators.required],
            mobile: ['', forms_1.Validators.required],
            fatherMobile: ['', forms_1.Validators.required],
            location: ['', forms_1.Validators.required],
            photo: ['', forms_1.Validators.required],
            bloodType: ['', forms_1.Validators.required],
            interest: ['', forms_1.Validators.required],
            gender: ['', forms_1.Validators.required],
            medicalCondition: [''],
            bio: [''],
            lang: ['English'],
            groupid: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, emailValid()]],
            password: ['', forms_1.Validators.required],
            confirmPassword: ['', forms_1.Validators.required]
        }, { validator: matchingFields('password', 'confirmPassword') });
    }
    ngOnInit() {
        var ssn;
        this.webService.getGroups();
        this.webService.getUser(ssn).subscribe(res => {
            this.currentUser = res;
            // console.log(this.currentUser);
        });
    }
    onSubmit() {
        console.log(this.form.errors);
        this.auth.register(this.form.value);
    }
    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched;
    }
};
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'register',
        templateUrl: 'register.component.html',
        styles: [`
        .error {
            background-color: #fff0f0
        }
    `]
    }),
    __metadata("design:paramtypes", [web_service_1.WebService, forms_1.FormBuilder, auth_service_1.AuthService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
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
//# sourceMappingURL=register.component.js.map