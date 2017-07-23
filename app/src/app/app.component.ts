import { Component,OnInit } from '@angular/core';
import { NavComponent } from './nav.component';
import { AuthService } from './auth.service'
import { WebService } from './web.service'
import { Router } from '@angular/router'


@Component({
  selector: 'my-app',
    moduleId: module.id,
    templateUrl: 'app.component.html'
})
export class AppComponent {

	constructor(private webService:WebService,private auth: AuthService,private router: Router){
		
		if (!auth.isAuthenticated) {
            this.router.navigate(['/login']);
        }
	}
}
