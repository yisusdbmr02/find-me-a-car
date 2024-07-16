import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
   /**
   * This class component shows the main navbar of the application .
   * @param element - boolean variable it´s true/false depend of the status of the navbar 
   * @beta  
   */
  element = true;
  //Methods for show/hide the navbar
  showData() {
       /**
     * This function shows the navbar
     *
     * @returns resolves element to true when the navbar should be visible
     */
    return (this.element = true);
  }
  hideData() {
      /**
     * This function hides the navbar
     *
     * @returns resolves element to false when the navbar should´t be visible
     */
    return (this.element = false);
  }
}
