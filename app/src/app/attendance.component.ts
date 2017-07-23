import { Component } from '@angular/core'
import { WebService } from './web.service'
import { AuthService } from './auth.service'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'attendance',
	template: `<div>
	<button *ngIf="currentUser.groupid!=4" color="primary" md-button routerLink="/mark-attend">Mark trainee as attendent</button>
	<h1>Attendance List</h1>
    <div *ngFor="let attend of webService.attendance | async">
        <md-card class="card">
            <md-card-title style="cursor:pointer;" >{{attend.fullName}} attended class of {{attend.title}} at {{attend.attend_time}}.</md-card-title>       </md-card>
    </div>
    </div>`

})

export class AttendanceComponent {
	attendance;
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
	constructor(private webService: WebService, private route: ActivatedRoute,private auth: AuthService){}
	
	deleteUser(ssn){
		var ssn;
		console.log('ssn:' + ssn);
		this.webService.deleteUser({'ssn':ssn}).subscribe();
	}
	ngOnInit() {
		var ssn; 
		this.webService.getAttendance();
		this.webService.getUser(ssn).subscribe( res => {
            this.currentUser = res; 
        })
	}
	
}