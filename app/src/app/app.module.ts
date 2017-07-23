import * as $ from 'jquery';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule,MdListModule,MdCheckboxModule,MdSnackBarModule,MdCardModule,MdInputModule,MdTabsModule, MdMenuModule, MdToolbarModule, MdIconModule,MdSelectModule  } from '@angular/material';
import { AppComponent }  from './app.component';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './messages-component';
import { CoursesComponent } from './course/courses-component';
import { NewCourseComponent } from './course/new-course-component';
import { AssignCourseComponent } from './course/assign-course-component';
import { MarkAttendComponent } from './course/mark-attend-component';
import { CourseDetailsComponent } from './course/course-details-component';
import { WeeklyScheduleComponent } from './course/weekly-schedule.component';
import { NavComponent } from './nav.component';
import { RegisterComponent } from './register.component';
import { HomeComponent } from './home.component';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/material';
import  { LoginComponent } from './login.component';
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user.profile.component';
import { AttendanceComponent } from './attendance.component';
//import { WebCamComponent } from 'ng2-webcam';
//import { QRScannerComponent } from './qr-scan';
//import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';
import { NgUploaderModule } from 'ngx-uploader';

//import { QRCodeModule } from 'angular2-qrcode';
//import { NgxQRCodeModule } from 'ngx-qrcode2';
import { IdCardComponent } from './id.card.component';

import { DatepickerModule, AlertModule,DropdownModule, TooltipModule, TimepickerModule  } from 'ng2-bootstrap';
import { DateFormatPipe } from './shared/date-format.pipe';
import { SearchFilterPipe } from './shared/search-filter-pipe';
import { AuthGuard } from './shared/auth-guard-service';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './shared/right-sidebar/rightsidebar.component';
import { Ng2CompleterModule } from "ng2-completer";
//import { NKDatetimeModule } from 'ng2-datetime';


var routes = [{
    path: '',
    component: HomeComponent,
     canActivate: [AuthGuard]
  },{ 
    path: 'blank',
    loadChildren: './pages/blank/blank.module' 
  },
  {
    path: 'users',
    component: MessagesComponent
  },
  {
    path: 'profile/:ssn',
    component: UserProfileComponent
  },
  {
    path: 'course/view/:code',
    component: CourseDetailsComponent
  },
  {
    path: 'user/edit/:ssn',
    component: UserComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'weekly-schedule',
    component: WeeklyScheduleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'courses',
    component: CoursesComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'new-course',
    component: NewCourseComponent
  },
  {
    path: 'card/generate/:ssn',
    component: IdCardComponent
  },
  {
    path: 'assign-course',
    component: AssignCourseComponent
  },
  {
    path: 'mark-attend',
    component: MarkAttendComponent
  },
  {
    path: 'assign-course/:ssn',
    component: AssignCourseComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
     canActivate: [AuthGuard]
  }];

@NgModule({
  imports:      [ BrowserModule,MdSnackBarModule,NgUploaderModule,MdListModule,MdCheckboxModule,MdTabsModule,FormsModule,ReactiveFormsModule,HttpModule,
  				BrowserAnimationsModule,MdInputModule,MdSelectModule ,MdButtonModule, MdCardModule, MdMenuModule, 
  				MdToolbarModule,AlertModule.forRoot(),TimepickerModule.forRoot(),DropdownModule.forRoot(), TooltipModule.forRoot(),DatepickerModule.forRoot(), MdIconModule,RouterModule.forRoot(routes) ],
  declarations: [ AppComponent,NavigationComponent,
    BreadcrumbComponent, DateFormatPipe,SearchFilterPipe,
    SidebarComponent,NewCourseComponent,CoursesComponent,WeeklyScheduleComponent,MarkAttendComponent,AssignCourseComponent,CourseDetailsComponent,
    RightSidebarComponent,IdCardComponent,AttendanceComponent, UserComponent,LoginComponent,UserProfileComponent,MessagesComponent,RegisterComponent,NavComponent,HomeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ WebService,AuthService,LiveAnnouncer,AuthGuard ]
})
export class AppModule { }
