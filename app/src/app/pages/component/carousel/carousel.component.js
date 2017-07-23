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
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
let NgbdCarouselBasic = class NgbdCarouselBasic {
    constructor(config) {
        // customize default values of carousels used by this component tree
        config.interval = 10000;
        config.wrap = false;
        config.keyboard = false;
    }
};
NgbdCarouselBasic = __decorate([
    core_1.Component({
        selector: 'ngbd-buttons-radio',
        templateUrl: './carousel.component.html',
        providers: [ng_bootstrap_1.NgbCarouselConfig]
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbCarouselConfig])
], NgbdCarouselBasic);
exports.NgbdCarouselBasic = NgbdCarouselBasic;
//# sourceMappingURL=carousel.component.js.map