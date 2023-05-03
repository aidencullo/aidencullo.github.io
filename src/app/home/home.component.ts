import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    clicked = false;

    handleClick() {
	console.log("click handled!")
	this.clicked = true;
    }
    
}