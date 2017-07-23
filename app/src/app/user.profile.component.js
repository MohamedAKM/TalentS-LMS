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
const router_1 = require("@angular/router");
let UserProfileComponent = class UserProfileComponent {
    constructor(webService, route) {
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
            facebook: '',
            twitter: '',
            instagram: '',
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
    }
    ngOnInit() {
        var ssn = this.route.snapshot.params.ssn;
        console.log('ssn:' + ssn);
        this.webService.getUser(ssn).subscribe(res => {
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
        });
    }
};
UserProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user',
        templateUrl: 'user.profile.html'
    }),
    __metadata("design:paramtypes", [web_service_1.WebService, router_1.ActivatedRoute])
], UserProfileComponent);
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user.profile.component.js.map