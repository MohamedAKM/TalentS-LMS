import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx'
import { MdSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:1234/api';

    private messageStore = [];
    private coursesStorage = [];
    private attendanceStore = [];
    private categoriesStore = [];
    private groupsStore = [];
    private weeklyStore = [];
    private currentUserStore = [];

    private messageSubjet = new Subject();
    private coursesSubjet = new Subject();
    private attendanceSubjet = new Subject();
    private categoriesSubjet = new Subject();
    private groupsSubjet = new Subject();
    private weeklySubjet = new Subject();
    private currentUserSubjet = new Subject();
    
    messages = this.messageSubjet.asObservable();
    attendance = this.attendanceSubjet.asObservable();
    courses = this.coursesSubjet.asObservable();
    categories = this.categoriesSubjet.asObservable();
    groups = this.groupsSubjet.asObservable();
    weekly = this.weeklySubjet.asObservable();
    currentUser = this.currentUserSubjet.asObservable();

    constructor(private http: Http, private sb: MdSnackBar,private router: Router, private auth: AuthService) {
        this.getMessages('');
    }

    getMessages(user) {
        user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/messages' + user).subscribe(response => {
            this.messageStore = response.json();
            this.messageSubjet.next(this.messageStore);
        }, error => {
            this.handleError("Unable to get users");
        });
    }

    getCurrentUser() {
        if(!this.currentUser.isEmpty) return; 
        
        this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).subscribe(response => {
            this.currentUserStore = response.json();
            this.currentUserSubjet.next(this.currentUserStore);
        }, error => {
            this.handleError("Unable to get user info");
        });
    }

    getGroups() {
 
        this.http.get(this.BASE_URL + '/groups').subscribe(response => {
            this.groupsStore = response.json();
            this.groupsSubjet.next(this.groupsStore);
        }, error => {
            this.handleError("Unable to get groups");
        });
    }
    getCourses(user) {
        user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/courses' + user,this.auth.tokenHeader).subscribe(response => {
            this.coursesStorage = response.json();
            this.coursesSubjet.next(this.coursesStorage);
        }, error => {
            this.handleError("Unable to get courses");
        });
    }    
    listCategories() {
        
        this.http.get(this.BASE_URL + '/categories_list').subscribe(response => {
            this.categoriesStore = response.json();
            this.categoriesSubjet.next(this.categoriesStore);
        }, error => {
            this.handleError("Unable to get categories");
        });
    }
    getAttendance() {
        //user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/attendance', this.auth.tokenHeader).subscribe(response => {
            this.attendanceStore = response.json();
            this.attendanceSubjet.next(this.attendanceStore);
        }, error => {
            this.handleError("Unable to get attendance");
        });
    }
    getWeekly() {
        //user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/weekly', this.auth.tokenHeader).subscribe(response => {
            this.weeklyStore = response.json();
         //   this.weekly = response.json();
            this.weeklySubjet.next(this.weeklyStore);
        }, error => {
            this.handleError("Unable to get weekly");
        });
    }
    async postMessages(message) {
        try {
            var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
            this.messageStore.push(response.json());
            this.messageSubjet.next(this.messageStore);
        } catch (error) {
            console.log(error)
            this.handleError("Unable to post message");
        }

    }
    async postCourse(course) {
        try {
            var response = await this.http.post(this.BASE_URL + '/course', course).toPromise();
            this.coursesStorage.push(response.json());
            this.coursesSubjet.next(this.coursesStorage);
        } catch (error) {
            console.log(error)
            this.handleError("Unable to post course");
        }

    }
    async assignCourse(course) {
        try {
            var response = await this.http.post(this.BASE_URL + '/assign', course).toPromise();
          //  this.coursesStorage.push(response.json());
           // this.coursesSubjet.next(this.coursesStorage);
        } catch (error) {
            console.log(error)
            this.handleError("Unable to post course");
        }

    }
    async markAttend(course) {
        try {
            var response = await this.http.post(this.BASE_URL + '/mark-attend', course).toPromise();
          //  this.coursesStorage.push(response.json());
           // this.coursesSubjet.next(this.coursesStorage);
        } catch (error) {
            console.log(error)
            this.handleError("Unable to mark attendance");
        }

    }
    getUser(ssn) {

        if (ssn) {
            return this.http.get(this.BASE_URL + '/users/profile/'+ ssn, this.auth.tokenHeader).map(res => res.json());
        }else{
            return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res => res.json());
        }
    }    
    getCourse(code) {
         return this.http.get(this.BASE_URL + '/course/'+ code,this.auth.tokenHeader).map(res => res.json());   
    } 
    getFiles(code) {
         return this.http.get(this.BASE_URL + '/files/'+ code,this.auth.tokenHeader).map(res => res.json());   
    } 
    saveUser(userData) {
        return this.http.post(this.BASE_URL + '/users/me', userData,this.auth.tokenHeader).map(res => res.json());
    }

    deleteUser(userData) {
        return this.http.post(this.BASE_URL + '/users/delete', userData,this.auth.tokenHeader).map(res => res.json());
        //this.router.navigate(['/users']);
    }

    private handleError(error) {
        console.error(error);
        this.sb.open(error, 'close', { duration: 2000 });
    }
}