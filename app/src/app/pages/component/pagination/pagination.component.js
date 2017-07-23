"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let NgbdpaginationBasic = class NgbdpaginationBasic {
    constructor() {
        this.page = 4;
        this.page2 = 1;
        this.currentPage = 3;
        this.disablepage = 3;
        this.isDisabled = true;
    }
    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }
};
NgbdpaginationBasic = __decorate([
    core_1.Component({
        selector: 'ngbd-pagination',
        templateUrl: './pagination.component.html'
    })
], NgbdpaginationBasic);
exports.NgbdpaginationBasic = NgbdpaginationBasic;
//# sourceMappingURL=pagination.component.js.map