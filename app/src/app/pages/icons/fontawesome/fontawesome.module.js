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
const fontawesome_component_1 = require("./fontawesome.component");
const routes = [{
        path: '',
        data: {
            title: 'FontAwesome page',
            urls: [{ title: 'Dashboard', url: '/' }, { title: 'FontAwesome page' }]
        },
        component: fontawesome_component_1.fontawesomeComponent
    }];
let FontawesomeModule = class FontawesomeModule {
};
FontawesomeModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule,
            common_1.CommonModule,
            router_1.RouterModule.forChild(routes)
        ],
        declarations: [fontawesome_component_1.fontawesomeComponent]
    })
], FontawesomeModule);
exports.default = FontawesomeModule;
//# sourceMappingURL=fontawesome.module.js.map