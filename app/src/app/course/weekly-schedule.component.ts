import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'course-weekly',
    templateUrl:'course-weekly.html',
/*    template: `
        <md-card class="card">
            <md-input-container>
                <input mdInput [(ngModel)]="model.fullName" placeholder="Full Name">
            </md-input-container>
            <md-input-container>
                <input mdInput [(ngModel)]="model.education" placeholder="Education">
            </md-input-container>
            <button md-raised-button color="primary" (click)="saveUser(model)">Save Changes</button>
        </md-card>
    `*/
})
export class WeeklyScheduleComponent {

    constructor(private webService : WebService,private route: ActivatedRoute) {}
    
        ngOnInit() {
            this.webService.getWeekly();

        }
}
