import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { fontawesomeComponent } from './fontawesome.component';

const routes: Routes = [{
	path: '',
	data: {
      title: 'FontAwesome page',
      urls: [{title: 'Dashboard',url: '/'},{title: 'FontAwesome page'}]
    },
	component: fontawesomeComponent
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule, 
    	RouterModule.forChild(routes)
    ],
	declarations: [fontawesomeComponent]
})
export default class FontawesomeModule { }