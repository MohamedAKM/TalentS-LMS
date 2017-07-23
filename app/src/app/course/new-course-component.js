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
//import { CompleterService, CompleterData } from 'ng2-completer';
let NewCourseComponent = class NewCourseComponent {
    constructor(fb, auth, webService) {
        this.fb = fb;
        this.auth = auth;
        this.webService = webService;
        // protected searchUser: string;
        //   protected dataService: CompleterData;
        this.start_t = "";
        this.categoryid = "Loading...";
        this.userid = "Loading...";
        var ssn;
        this.webService.getMessages(ssn);
        //  this.dataService = completerService.local(this.webService.messages, 'fullName', 'fullName'); 
        //  var categories = this.webService.getMessages().subscribe();
        this.form = fb.group({
            code: ['', forms_1.Validators.required],
            title: ['', forms_1.Validators.required],
            level: ['', forms_1.Validators.required],
            userid: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            categoryid: ['', forms_1.Validators.required],
            language: ['', forms_1.Validators.required],
            sat_time_start: [''],
            sat_time_end: [''],
            sun_time_start: [''],
            sun_time_end: [''],
            mon_time_start: [''],
            mon_time_end: [''],
            tue_time_start: [''],
            tue_time_end: [''],
            wed_time_start: [''],
            wed_time_end: [''],
            thr_time_start: [''],
            thr_time_end: [''],
            fri_time_start: [''],
            fri_time_end: [''],
            location: ['', forms_1.Validators.required]
        });
    }
    get diagnostic() {
        return JSON.stringify(this.start_t);
    }
    onSubmit() {
        console.log(this.form.errors);
        console.log(this.form.value);
        this.webService.postCourse(this.form.value);
    }
    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched;
    }
    ngOnInit() {
        var ssn;
        this.webService.listCategories();
        this.webService.getUser(ssn);
        //this.webService.deleteUser(ssn);
    }
};
NewCourseComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'new-course',
        templateUrl: 'new-course.html',
        styles: [`
        .error {
            background-color: #fff0f0
        }
    `]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, auth_service_1.AuthService, web_service_1.WebService])
], NewCourseComponent);
exports.NewCourseComponent = NewCourseComponent;
//# sourceMappingURL=new-course-component.js.map