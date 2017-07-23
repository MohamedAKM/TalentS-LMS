import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbdtabsBasic } from './tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
const routes: Routes = [{
	path: '',
	data: {
      title: 'Tabs page',
      urls: [{title: 'Dashboard', url: '/'},{title: 'Angular Component'},{title: 'Tabs page'}]
    },
	component: NgbdtabsBasic
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule,
      
      NgbModule.forRoot(),
    	RouterModule.forChild(routes)
    ],
	declarations: [NgbdtabsBasic]
})
export default class TabsModule { }
