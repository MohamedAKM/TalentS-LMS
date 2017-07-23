"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const material_1 = require("@angular/material");
const app_component_1 = require("./app.component");
const router_1 = require("@angular/router");
const messages_component_1 = require("./messages-component");
const courses_component_1 = require("./course/courses-component");
const new_course_component_1 = require("./course/new-course-component");
const assign_course_component_1 = require("./course/assign-course-component");
const mark_attend_component_1 = require("./course/mark-attend-component");
const course_details_component_1 = require("./course/course-details-component");
const weekly_schedule_component_1 = require("./course/weekly-schedule.component");
const nav_component_1 = require("./nav.component");
const register_component_1 = require("./register.component");
const home_component_1 = require("./home.component");
const web_service_1 = require("./web.service");
const auth_service_1 = require("./auth.service");
const http_1 = require("@angular/http");
const forms_1 = require("@angular/forms");
const material_2 = require("@angular/material");
const login_component_1 = require("./login.component");
const user_component_1 = require("./user.component");
const user_profile_component_1 = require("./user.profile.component");
const attendance_component_1 = require("./attendance.component");
//import { WebCamComponent } from 'ng2-webcam';
//import { QRScannerComponent } from './qr-scan';
//import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';
const ngx_uploader_1 = require("ngx-uploader");
//import { QRCodeModule } from 'angular2-qrcode';
//import { NgxQRCodeModule } from 'ngx-qrcode2';
const id_card_component_1 = require("./id.card.component");
const ng2_bootstrap_1 = require("ng2-bootstrap");
const date_format_pipe_1 = require("./shared/date-format.pipe");
const search_filter_pipe_1 = require("./shared/search-filter-pipe");
const auth_guard_service_1 = require("./shared/auth-guard-service");
const navigation_component_1 = require("./shared/navigation/navigation.component");
const sidebar_component_1 = require("./shared/sidebar/sidebar.component");
const breadcrumb_component_1 = require("./shared/breadcrumb/breadcrumb.component");
const rightsidebar_component_1 = require("./shared/right-sidebar/rightsidebar.component");
//import { NKDatetimeModule } from 'ng2-datetime';
var routes = [{
        path: '',
        component: home_component_1.HomeComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    }, {
        path: 'blank',
        loadChildren: './pages/blank/blank.module'
    },
    {
        path: 'users',
        component: messages_component_1.MessagesComponent
    },
    {
        path: 'profile/:ssn',
        component: user_profile_component_1.UserProfileComponent
    },
    {
        path: 'course/view/:code',
        component: course_details_component_1.CourseDetailsComponent
    },
    {
        path: 'user/edit/:ssn',
        component: user_component_1.UserComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'weekly-schedule',
        component: weekly_schedule_component_1.WeeklyScheduleComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'user',
        component: user_component_1.UserComponent
    },
    {
        path: 'profile',
        component: user_profile_component_1.UserProfileComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'courses',
        component: courses_component_1.CoursesComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'new-course',
        component: new_course_component_1.NewCourseComponent
    },
    {
        path: 'card/generate/:ssn',
        component: id_card_component_1.IdCardComponent
    },
    {
        path: 'assign-course',
        component: assign_course_component_1.AssignCourseComponent
    },
    {
        path: 'mark-attend',
        component: mark_attend_component_1.MarkAttendComponent
    },
    {
        path: 'assign-course/:ssn',
        component: assign_course_component_1.AssignCourseComponent
    },
    {
        path: 'attendance',
        component: attendance_component_1.AttendanceComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    }];
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, material_1.MdSnackBarModule, ngx_uploader_1.NgUploaderModule, material_1.MdListModule, material_1.MdCheckboxModule, material_1.MdTabsModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule,
            animations_1.BrowserAnimationsModule, material_1.MdInputModule, material_1.MdSelectModule, material_1.MdButtonModule, material_1.MdCardModule, material_1.MdMenuModule,
            material_1.MdToolbarModule, ng2_bootstrap_1.AlertModule.forRoot(), ng2_bootstrap_1.TimepickerModule.forRoot(), ng2_bootstrap_1.DropdownModule.forRoot(), ng2_bootstrap_1.TooltipModule.forRoot(), ng2_bootstrap_1.DatepickerModule.forRoot(), material_1.MdIconModule, router_1.RouterModule.forRoot(routes)],
        declarations: [app_component_1.AppComponent, navigation_component_1.NavigationComponent,
            breadcrumb_component_1.BreadcrumbComponent, date_format_pipe_1.DateFormatPipe, search_filter_pipe_1.SearchFilterPipe,
            sidebar_component_1.SidebarComponent, new_course_component_1.NewCourseComponent, courses_component_1.CoursesComponent, weekly_schedule_component_1.WeeklyScheduleComponent, mark_attend_component_1.MarkAttendComponent, assign_course_component_1.AssignCourseComponent, course_details_component_1.CourseDetailsComponent,
            rightsidebar_component_1.RightSidebarComponent, id_card_component_1.IdCardComponent, attendance_component_1.AttendanceComponent, user_component_1.UserComponent, login_component_1.LoginComponent, user_profile_component_1.UserProfileComponent, messages_component_1.MessagesComponent, register_component_1.RegisterComponent, nav_component_1.NavComponent, home_component_1.HomeComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [web_service_1.WebService, auth_service_1.AuthService, material_2.LiveAnnouncer, auth_guard_service_1.AuthGuard]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map