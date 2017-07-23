"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const rating_component_1 = require("./rating.component");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const routes = [{
        path: '',
        data: {
            title: 'Rating page',
            urls: [{ title: 'Dashboard', url: '/' }, { title: 'Angular Component' }, { title: 'Rating page' }]
        },
        component: rating_component_1.NgbdratingBasic
    }];
let RatingModule = class RatingModule {
};
RatingModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule,
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            router_1.RouterModule.forChild(routes)
        ],
        declarations: [rating_component_1.NgbdratingBasic]
    })
], RatingModule);
exports.default = RatingModule;
//# sourceMappingURL=rating.module.js.map