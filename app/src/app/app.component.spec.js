"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_component_1 = require("./app.component");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
describe('AppComponent', function () {
    let de;
    let comp;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
    });
    it('should create component', () => expect(comp).toBeDefined());
    it('should have expected <h1> text', () => {
        fixture.detectChanges();
        const h1 = de.nativeElement;
        expect(h1.innerText).toMatch(/angular/i, '<h1> should say something about "Angular"');
    });
});
//# sourceMappingURL=app.component.spec.js.map