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
const auth_service_1 = require("../../auth.service");
const web_service_1 = require("../../web.service");
let SidebarComponent = class SidebarComponent {
    constructor(auth, webService) {
        this.auth = auth;
        this.webService = webService;
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
    }
    ngOnInit() {
        var ssn;
        this.webService.getUser(ssn).subscribe(res => {
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
        });
    }
};
SidebarComponent = __decorate([
    core_1.Component({
        selector: 'ma-sidebar',
        templateUrl: './sidebar.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, web_service_1.WebService])
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map