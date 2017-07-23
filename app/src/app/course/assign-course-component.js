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
const auth_service_1 = require("../auth.service");
const web_service_1 = require("../web.service");
const router_1 = require("@angular/router");
let AssignCourseComponent = class AssignCourseComponent {
    constructor(fb, route, auth, webService) {
        this.fb = fb;
        this.route = route;
        this.auth = auth;
        this.webService = webService;
        this.courseid = "Loading...";
        this.userid = this.route.snapshot.params.ssn;
        var ssn;
        this.webService.getMessages(ssn);
        //this.dataService = completerService.local(this.webService.messages, 'fullName', 'fullName'); 
        //  var categories = this.webService.getMessages().subscribe();
        this.form = fb.group({
            userid: ['', forms_1.Validators.required],
            courseid: ['', forms_1.Validators.required]
        });
    }
    onSubmit() {
        console.log(this.form.errors);
        this.webService.assignCourse(this.form.value);
    }
    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched;
    }
    ngOnInit() {
        var ssn;
        this.webService.listCategories();
        this.webService.getCourses(ssn);
        this.webService.getUser(ssn);
        //this.webService.deleteUser(ssn);
    }
};
AssignCourseComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'assign-course',
        templateUrl: 'assign-course.html',
        styles: [`
        .error {
            background-color: #fff0f0
        }
    `]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, auth_service_1.AuthService, web_service_1.WebService])
], AssignCourseComponent);
exports.AssignCourseComponent = AssignCourseComponent;
//# sourceMappingURL=assign-course-component.js.map