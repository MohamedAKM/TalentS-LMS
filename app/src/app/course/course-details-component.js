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
const router_1 = require("@angular/router");
const ngx_uploader_1 = require("ngx-uploader");
let CourseDetailsComponent = class CourseDetailsComponent {
    constructor(webService, route) {
        this.webService = webService;
        this.route = route;
        this.model = {
            title: '',
            code: '',
            description: '',
            categoryid: '',
            level: '',
            language: '',
            location: '',
            trainees: '',
            userid: ''
        };
        this.files = []; // local uploading files array
        this.uploadInput = new core_1.EventEmitter(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = ngx_uploader_1.humanizeBytes;
    }
    onUploadOutput(output) {
        console.log(output); // lets output to see what's going on in the console
        if (output.type === 'allAddedToQueue') {
            // uncomment this if you want to auto upload files when added
            // const event: UploadInput = {
            //   type: 'uploadAll',
            //   url: '/upload',
            //   method: 'POST',
            //   data: { foo: 'bar' },
            //   concurrency: 0
            // };
            // this.uploadInput.emit(event);
        }
        else if (output.type === 'addedToQueue') {
            this.files.push(output.file); // add file to array when added
        }
        else if (output.type === 'uploading') {
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => file.id === output.file.id);
            this.files[index] = output.file;
        }
        else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter((file) => file !== output.file);
        }
        else if (output.type === 'dragOver') {
            this.dragOver = true;
        }
        else if (output.type === 'dragOut') {
            this.dragOver = false;
        }
        else if (output.type === 'drop') {
            this.dragOver = false;
        }
        else if (output.type === 'done') {
            var course_code = this.route.snapshot.params.code;
            //console.log('course_code:' + course_code);
            this.webService.getFiles(course_code).subscribe(res => {
                this.files = res;
            });
        }
    }
    startUpload() {
        var course_code = this.route.snapshot.params.code;
        const event = {
            type: 'uploadAll',
            url: 'http://localhost:1234/api/upload',
            method: 'POST',
            data: { courseid: course_code },
            concurrency: 1 // set sequential uploading of files with concurrency 1
        };
        this.uploadInput.emit(event);
    }
    cancelUpload(id) {
        this.uploadInput.emit({ type: 'cancel', id: id });
    }
    ngOnInit() {
        var course_code = this.route.snapshot.params.code;
        console.log('course_code:' + course_code);
        this.webService.getCourse(course_code).subscribe(res => {
            this.model = res;
        });
        this.webService.getFiles(course_code).subscribe(res => {
            this.files = res;
        });
    }
};
CourseDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'course-details',
        templateUrl: 'course-details.html',
    }),
    __metadata("design:paramtypes", [web_service_1.WebService, router_1.ActivatedRoute])
], CourseDetailsComponent);
exports.CourseDetailsComponent = CourseDetailsComponent;
//# sourceMappingURL=course-details-component.js.map