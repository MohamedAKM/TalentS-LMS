"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let NgbdtimepickerBasic = class NgbdtimepickerBasic {
    constructor() {
        this.time = { hour: 13, minute: 30 };
        this.meridian = true;
        // This is for the seconds
        this.seconds = true;
        // This is for the spinners
        this.spinners = true;
        // This is for the column step
        this.time2 = { hour: 13, minute: 30, second: 0 };
        this.hourStep = 1;
        this.minuteStep = 15;
        this.secondStep = 30;
        this.ctrl = new forms_1.FormControl('', (control) => {
            const value = control.value;
            if (!value) {
                return null;
            }
            if (value.hour < 12) {
                return { tooEarly: true };
            }
            if (value.hour > 13) {
                return { tooLate: true };
            }
            return null;
        });
    }
    toggleMeridian() {
        this.meridian = !this.meridian;
    }
    toggleSeconds() {
        this.seconds = !this.seconds;
    }
    toggleSpinners() {
        this.spinners = !this.spinners;
    }
};
NgbdtimepickerBasic = __decorate([
    core_1.Component({
        selector: 'ngbd-timepicker',
        templateUrl: './timepicker.component.html'
    })
], NgbdtimepickerBasic);
exports.NgbdtimepickerBasic = NgbdtimepickerBasic;
//# sourceMappingURL=timepicker.component.js.map