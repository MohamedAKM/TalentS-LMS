import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BlankComponent } from './blank.component';

const routes: Routes = [{
	path: '',
	data: {
      title: 'Blank page',
      urls: [{title: 'Dashboard',url: '/'},{title: 'Blank page'}]
    },
	component: BlankComponent
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule, 
    	RouterModule.forChild(routes)
    ],
	declarations: [BlankComponent]
})
export default class BlankModule { }