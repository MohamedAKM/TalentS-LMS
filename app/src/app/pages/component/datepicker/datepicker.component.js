"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const my = new Date();
let NgbdDatepickerBasic = class NgbdDatepickerBasic {
    constructor() {
        // This is for multiple month
        this.displayMonths = 2;
        this.navigation = 'select';
        // This is for the disable datepicker
        this.model3 = { year: my.getFullYear(), month: my.getMonth() + 1, day: my.getDate() };
        this.disabled = true;
    }
    selectToday() {
        this.model = { year: my.getFullYear(), month: my.getMonth() + 1, day: my.getDate() };
    }
};
NgbdDatepickerBasic = __decorate([
    core_1.Component({
        selector: 'datepicker-basic',
        templateUrl: './datepicker.component.html'
    })
], NgbdDatepickerBasic);
exports.NgbdDatepickerBasic = NgbdDatepickerBasic;
//# sourceMappingURL=datepicker.component.js.map