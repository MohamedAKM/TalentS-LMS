import { Component } from '@angular/core'
import { WebService } from '../web.service'
import { AuthService } from '../auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MdSnackBar } from '@angular/material';
@Component({
    selector: 'my-courses',
    moduleId: module.id,
    templateUrl: 'my-courses.html'

})

export class CoursesComponent {
    Courses;
    errorMessage:string; 
            currentUser = {
            fullName: '',
            dob: '',
            education: '',
            ssn: '',
            gender:'',
            mobile: '',
            fatherMobile: '',
            location: '',
            photo:'',
            bloodType:'',
            interest: '',
            bio: '',
            facebook:'',
            twitter: '',
            instagram: '',
            lang: ['English'],
            email: '',
            groupid:'',
            password: ''
    }
    constructor(private webService: WebService,private sb:MdSnackBar, private router: Router, private route: ActivatedRoute,private auth: AuthService){}
    
/*    deleteCourse(courseCode){
        //var courseCode = this.route.snapshot.params.courseCode;
        console.log('courseCode:' + courseCode);
        this.webService.deleteCourse({'courseCode':courseCode}).subscribe(
          data => {
             
             console.log(data);
             if(data.success == false){
                this.errorMessage = data.message;  
                this.sb.open( this.errorMessage);
             }else{
                 this.sb.open("Course was deleted successfully",'close' ,{duration:2000});
                 this.router.navigate(['/']);
                  //this.router.navigate(['/users']);

             }
          }, 
          err => {
            this.errorMessage = err; 
            console.log(err);
          });
    }*/
    ngOnInit() {
        var ssn = this.route.snapshot.params.ssn;
        console.log('ssn:' + ssn);
        this.webService.getCourses(ssn);
               
        this.webService.getUser(ssn).subscribe( res => {
            this.currentUser = res; 
        })
    }
    
}