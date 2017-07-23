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
const http_1 = require("@angular/http");
const Observable_1 = require("rxjs/Observable");
const router_1 = require("@angular/router");
let AuthService = class AuthService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.BASE_URL = 'http://localhost:1234/auth';
        this.NAME_KEY = 'name';
        this.TOKEN_KEY = 'token';
    }
    get role() {
        return localStorage.getItem(this.NAME_KEY);
    }
    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }
    get tokenHeader() {
        var header = new http_1.Headers({ 'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY) });
        return new http_1.RequestOptions({ headers: header });
    }
    login(loginData) {
        return this.http.post(this.BASE_URL + '/login', loginData)
            .map(res => res.json())
            .do(res => {
            var authResponse = res;
            if (!authResponse.token)
                return;
            localStorage.setItem(this.TOKEN_KEY, authResponse.token);
            localStorage.setItem(this.NAME_KEY, authResponse.role);
            this.router.navigate(['/']);
        });
    }
    register(user) {
        delete user.confirmPassword;
        if (user.password == "") {
            delete user.password;
        }
        this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
            res = res.json();
            this.router.navigate(['/assign-course/']);
        });
    }
    logout() {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/login']);
    }
    authenticate(res) {
        var authResponse = res.json();
        if (!authResponse.token)
            return;
        localStorage.setItem(this.TOKEN_KEY, authResponse.token);
        localStorage.setItem(this.NAME_KEY, authResponse.role);
        this.router.navigate(['/']);
    }
    /**
     * Handle any errors from the API
     */
    handleError(err) {
        let errMessage;
        if (err instanceof http_1.Response) {
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
        }
        else {
            errMessage = err.message ? err.message : err.toString();
        }
        return Observable_1.Observable.throw(errMessage);
    }
};
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map