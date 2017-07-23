import { Component, AfterViewInit } from '@angular/core';
@Component({
	selector: 'ea-blank',
	templateUrl: 'blank.component.html'
})
export class BlankComponent implements AfterViewInit {
	title:string;
	subtitle:string;	
	constructor() {
		this.title = "Blank Page title";  
		this.subtitle = "This is some text within a card block."
	}

	ngAfterViewInit(){}
}