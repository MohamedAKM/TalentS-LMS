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
let WeeklyScheduleComponent = class WeeklyScheduleComponent {
    constructor(webService, route) {
        this.webService = webService;
        this.route = route;
    }
    ngOnInit() {
        this.webService.getWeekly();
    }
};
WeeklyScheduleComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'course-weekly',
        templateUrl: 'course-weekly.html',
    }),
    __metadata("design:paramtypes", [web_service_1.WebService, router_1.ActivatedRoute])
], WeeklyScheduleComponent);
exports.WeeklyScheduleComponent = WeeklyScheduleComponent;
//# sourceMappingURL=weekly-schedule.component.js.map