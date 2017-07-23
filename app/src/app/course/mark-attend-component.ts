import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router'
@Component({
    moduleId: module.id,
    selector: 'mark-attend-course',
    templateUrl: 'mark-attend-course.html',
    styles: [`
        .error {
            background-color: #fff0f0
        }
    `]
})
export class MarkAttendComponent {
    form;
    protected searchUser: string;

  
    courseid="Loading...";
    userid=this.route.snapshot.params.ssn;
    constructor(private fb: FormBuilder,private route: ActivatedRoute, private auth : AuthService,  private webService : WebService) {
       var ssn;
        this.webService.getMessages(ssn);
//this.dataService = completerService.local(this.webService.messages, 'fullName', 'fullName'); 
      //  var categories = this.webService.getMessages().subscribe();
    this.form = fb.group({
            userid: ['', Validators.required],
            courseid: ['', Validators.required]
        })
    }

    onSubmit() {
        console.log(this.form.errors);
       this.webService.markAttend(this.form.value);
    }

    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched
    }
    ngOnInit() {
        var ssn;
        this.webService.listCategories();
        this.webService.getCourses(ssn);
        this.webService.getUser(ssn);
    }
}
