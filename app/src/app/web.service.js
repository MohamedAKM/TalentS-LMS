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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
const Rx_1 = require("rxjs/Rx");
const material_1 = require("@angular/material");
const auth_service_1 = require("./auth.service");
const router_1 = require("@angular/router");
let WebService = class WebService {
    constructor(http, sb, router, auth) {
        this.http = http;
        this.sb = sb;
        this.router = router;
        this.auth = auth;
        this.BASE_URL = 'http://localhost:1234/api';
        this.messageStore = [];
        this.coursesStorage = [];
        this.attendanceStore = [];
        this.categoriesStore = [];
        this.groupsStore = [];
        this.weeklyStore = [];
        this.currentUserStore = [];
        this.messageSubjet = new Rx_1.Subject();
        this.coursesSubjet = new Rx_1.Subject();
        this.attendanceSubjet = new Rx_1.Subject();
        this.categoriesSubjet = new Rx_1.Subject();
        this.groupsSubjet = new Rx_1.Subject();
        this.weeklySubjet = new Rx_1.Subject();
        this.currentUserSubjet = new Rx_1.Subject();
        this.messages = this.messageSubjet.asObservable();
        this.attendance = this.attendanceSubjet.asObservable();
        this.courses = this.coursesSubjet.asObservable();
        this.categories = this.categoriesSubjet.asObservable();
        this.groups = this.groupsSubjet.asObservable();
        this.weekly = this.weeklySubjet.asObservable();
        this.currentUser = this.currentUserSubjet.asObservable();
        this.getMessages('');
    }
    getMessages(user) {
        user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/messages' + user).subscribe(response => {
            this.messageStore = response.json();
            this.messageSubjet.next(this.messageStore);
        }, error => {
            this.handleError("Unable to get users");
        });
    }
    getCurrentUser() {
        if (!this.currentUser.isEmpty)
            return;
        this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).subscribe(response => {
            this.currentUserStore = response.json();
            this.currentUserSubjet.next(this.currentUserStore);
        }, error => {
            this.handleError("Unable to get user info");
        });
    }
    getGroups() {
        this.http.get(this.BASE_URL + '/groups').subscribe(response => {
            this.groupsStore = response.json();
            this.groupsSubjet.next(this.groupsStore);
        }, error => {
            this.handleError("Unable to get groups");
        });
    }
    getCourses(user) {
        user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/courses' + user, this.auth.tokenHeader).subscribe(response => {
            this.coursesStorage = response.json();
            this.coursesSubjet.next(this.coursesStorage);
        }, error => {
            this.handleError("Unable to get courses");
        });
    }
    listCategories() {
        this.http.get(this.BASE_URL + '/categories_list').subscribe(response => {
            this.categoriesStore = response.json();
            this.categoriesSubjet.next(this.categoriesStore);
        }, error => {
            this.handleError("Unable to get categories");
        });
    }
    getAttendance() {
        //user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/attendance', this.auth.tokenHeader).subscribe(response => {
            this.attendanceStore = response.json();
            this.attendanceSubjet.next(this.attendanceStore);
        }, error => {
            this.handleError("Unable to get attendance");
        });
    }
    getWeekly() {
        //user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/weekly', this.auth.tokenHeader).subscribe(response => {
            this.weeklyStore = response.json();
            //   this.weekly = response.json();
            this.weeklySubjet.next(this.weeklyStore);
        }, error => {
            this.handleError("Unable to get weekly");
        });
    }
    postMessages(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var response = yield this.http.post(this.BASE_URL + '/messages', message).toPromise();
                this.messageStore.push(response.json());
                this.messageSubjet.next(this.messageStore);
            }
            catch (error) {
                console.log(error);
                this.handleError("Unable to post message");
            }
        });
    }
    postCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var response = yield this.http.post(this.BASE_URL + '/course', course).toPromise();
                this.coursesStorage.push(response.json());
                this.coursesSubjet.next(this.coursesStorage);
            }
            catch (error) {
                console.log(error);
                this.handleError("Unable to post course");
            }
        });
    }
    assignCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var response = yield this.http.post(this.BASE_URL + '/assign', course).toPromise();
                //  this.coursesStorage.push(response.json());
                // this.coursesSubjet.next(this.coursesStorage);
            }
            catch (error) {
                console.log(error);
                this.handleError("Unable to post course");
            }
        });
    }
    markAttend(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var response = yield this.http.post(this.BASE_URL + '/mark-attend', course).toPromise();
                //  this.coursesStorage.push(response.json());
                // this.coursesSubjet.next(this.coursesStorage);
            }
            catch (error) {
                console.log(error);
                this.handleError("Unable to mark attendance");
            }
        });
    }
    getUser(ssn) {
        if (ssn) {
            return this.http.get(this.BASE_URL + '/users/profile/' + ssn, this.auth.tokenHeader).map(res => res.json());
        }
        else {
            return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res => res.json());
        }
    }
    getCourse(code) {
        return this.http.get(this.BASE_URL + '/course/' + code, this.auth.tokenHeader).map(res => res.json());
    }
    getFiles(code) {
        return this.http.get(this.BASE_URL + '/files/' + code, this.auth.tokenHeader).map(res => res.json());
    }
    saveUser(userData) {
        return this.http.post(this.BASE_URL + '/users/me', userData, this.auth.tokenHeader).map(res => res.json());
    }
    deleteUser(userData) {
        return this.http.post(this.BASE_URL + '/users/delete', userData, this.auth.tokenHeader).map(res => res.json());
        //this.router.navigate(['/users']);
    }
    handleError(error) {
        console.error(error);
        this.sb.open(error, 'close', { duration: 2000 });
    }
};
WebService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, material_1.MdSnackBar, router_1.Router, auth_service_1.AuthService])
], WebService);
exports.WebService = WebService;
//# sourceMappingURL=web.service.js.map