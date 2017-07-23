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
const auth_service_1 = require("./auth.service");
const router_1 = require("@angular/router");
let AttendanceComponent = class AttendanceComponent {
    constructor(webService, route, auth) {
        this.webService = webService;
        this.route = route;
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
    }
    deleteUser(ssn) {
        var ssn;
        console.log('ssn:' + ssn);
        this.webService.deleteUser({ 'ssn': ssn }).subscribe();
    }
    ngOnInit() {
        var ssn;
        this.webService.getAttendance();
        this.webService.getUser(ssn).subscribe(res => {
            this.currentUser = res;
        });
    }
};
AttendanceComponent = __decorate([
    core_1.Component({
        selector: 'attendance',
        template: `<div>
	<button *ngIf="currentUser.groupid!=4" color="primary" md-button routerLink="/mark-attend">Mark trainee as attendent</button>
	<h1>Attendance List</h1>
    <div *ngFor="let attend of webService.attendance | async">
        <md-card class="card">
            <md-card-title style="cursor:pointer;" >{{attend.fullName}} attended class of {{attend.title}} at {{attend.attend_time}}.</md-card-title>       </md-card>
    </div>
    </div>`
    }),
    __metadata("design:paramtypes", [web_service_1.WebService, router_1.ActivatedRoute, auth_service_1.AuthService])
], AttendanceComponent);
exports.AttendanceComponent = AttendanceComponent;
//# sourceMappingURL=attendance.component.js.map