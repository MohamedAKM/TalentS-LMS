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
const web_service_1 = require("../web.service");
const auth_service_1 = require("../auth.service");
const router_1 = require("@angular/router");
const material_1 = require("@angular/material");
let CoursesComponent = class CoursesComponent {
    constructor(webService, sb, router, route, auth) {
        this.webService = webService;
        this.sb = sb;
        this.router = router;
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
    /*    deleteCourse(courseCode){
            //var courseCode = this.route.snapshot.params.courseCode;
            console.log('courseCode:' + courseCode);
            this.webService.deleteCourse({'courseCode':courseCode}).subscribe(
              data => {
                 
                 console.log(data);
                 if(data.success == false){
                    this.errorMessage = data.message;
                    this.sb.open( this.errorMessage);
                 }else{
                     this.sb.open("Course was deleted successfully",'close' ,{duration:2000});
                     this.router.navigate(['/']);
                      //this.router.navigate(['/users']);
    
                 }
              },
              err => {
                this.errorMessage = err;
                console.log(err);
              });
        }*/
    ngOnInit() {
        var ssn = this.route.snapshot.params.ssn;
        console.log('ssn:' + ssn);
        this.webService.getCourses(ssn);
        this.webService.getUser(ssn).subscribe(res => {
            this.currentUser = res;
        });
    }
};
CoursesComponent = __decorate([
    core_1.Component({
        selector: 'my-courses',
        moduleId: module.id,
        templateUrl: 'my-courses.html'
    }),
    __metadata("design:paramtypes", [web_service_1.WebService, material_1.MdSnackBar, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
], CoursesComponent);
exports.CoursesComponent = CoursesComponent;
//# sourceMappingURL=courses-component.js.map