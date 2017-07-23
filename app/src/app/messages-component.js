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
const material_1 = require("@angular/material");
let MessagesComponent = class MessagesComponent {
    constructor(webService, sb, router, route, auth) {
        this.webService = webService;
        this.sb = sb;
        this.router = router;
        this.route = route;
        this.auth = auth;
    }
    deleteUser(ssn) {
        //var ssn = this.route.snapshot.params.ssn;
        console.log('ssn:' + ssn);
        this.webService.deleteUser({ 'ssn': ssn }).subscribe(data => {
            console.log(data);
            if (data.success == false) {
                this.errorMessage = data.message;
                this.sb.open(this.errorMessage);
            }
            else {
                this.sb.open("User was deleted successfully", 'close', { duration: 2000 });
                this.router.navigate(['/']);
                //this.router.navigate(['/users']);
            }
        }, err => {
            this.errorMessage = err;
            console.log(err);
        });
    }
    ngOnInit() {
        var ssn = this.route.snapshot.params.ssn;
        console.log('ssn:' + ssn);
        this.webService.getMessages(ssn);
        this.webService.getGroups();
        //this.webService.deleteUser(ssn);
    }
};
MessagesComponent = __decorate([
    core_1.Component({
        selector: 'messages',
        template: `<button color="primary" md-button routerLink="/register">Add User</button><br /><div>
  <div class="row">
    <div class="col-lg-3 col-md-3" *ngFor="let message of webService.messages | async ">
      <div class="card">
            <div class="card-block">
                <div class="m-t-30 text-center"> <img [routerLink]="['/profile', message.ssn]"  src="../assets/images/users/5.jpg" alt="user" class="img-circle" width="150">
                    <h4 [routerLink]="['/profile', message.ssn]"  class="card-title m-t-10">{{message.fullName}}</h4>
                    <h6 *ngIf="message.groupid == 1" class="card-subtitle" >Admin</h6>
                    <h6 *ngIf="message.groupid == 2" class="card-subtitle" >Talent</h6>
                    <h6 *ngIf="message.groupid == 3" class="card-subtitle" >Trainer</h6>
                    <h6 *ngIf="message.groupid == 4" class="card-subtitle" >Trainee</h6>
                  
                </div>
            </div>
            <div>
                <hr>
          </div>
            <div class="card-block"> <small class="text-muted">Email address </small>
                <h6>{{message.email}}</h6> <small class="text-muted p-t-3 db">Phone</small>
                <h6>{{message.mobile}}</h6> <small class="text-muted p-t-3 db">Education</small>
                <h6>{{message.education}}</h6>

                <button [routerLink]="['/card/generate', message.ssn]" class="btn btn-circle btn-secondary"><i class="fa fa-qrcode"></i></button>
                <button [routerLink]="['/user/edit', message.ssn]" class="btn btn-circle btn-secondary"><i class="fa fa-pencil"></i></button>
                <button (click)="deleteUser(message.ssn)" class="btn btn-circle btn-secondary"><i class="fa fa-trash"></i></button>
            </div>
        </div>
                       
    </div>
    </div></div>`
    }),
    __metadata("design:paramtypes", [web_service_1.WebService, material_1.MdSnackBar, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
], MessagesComponent);
exports.MessagesComponent = MessagesComponent;
//# sourceMappingURL=messages-component.js.map