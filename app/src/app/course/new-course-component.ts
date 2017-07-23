import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { WebService } from '../web.service';
//import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
    moduleId: module.id,
    selector: 'new-course',
    templateUrl: 'new-course.html',
    styles: [`
        .error {
            background-color: #fff0f0
        }
    `]
})
export class NewCourseComponent {
    form;
   // protected searchUser: string;
 //   protected dataService: CompleterData;
    
      start_t=""; 
    categoryid="Loading...";
    userid="Loading...";
    constructor(private fb: FormBuilder, private auth : AuthService,  private webService : WebService) {
       var ssn;
        this.webService.getMessages(ssn);
      //  this.dataService = completerService.local(this.webService.messages, 'fullName', 'fullName'); 
      //  var categories = this.webService.getMessages().subscribe();
    this.form = fb.group({
            code: ['', Validators.required],
            title: ['', Validators.required],
            level: ['', Validators.required],
            userid: ['', Validators.required],
            description: ['', Validators.required],
            categoryid: ['', Validators.required],
            language: ['', Validators.required],
            sat_time_start: [''],
            sat_time_end: [''],
            sun_time_start: [''],
            sun_time_end: [''],
            mon_time_start: [''],
            mon_time_end: [''],
            tue_time_start: [''],
            tue_time_end: [''],            
            wed_time_start: [''],
            wed_time_end: [''],
            thr_time_start: [''],
            thr_time_end: [''],
            fri_time_start: [''],
            fri_time_end: [''],
            location: ['', Validators.required]
        })
    }

     get diagnostic() {
    return JSON.stringify(this.start_t);
  }
    onSubmit() {
        console.log(this.form.errors);
       console.log(this.form.value);
       this.webService.postCourse(this.form.value);
    }

    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched
    }
    ngOnInit() {
        var ssn;
        this.webService.listCategories();
        this.webService.getUser(ssn);
        
        //this.webService.deleteUser(ssn);

    }
}
