import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})

export class HomeComponent {
/**
 * This class component shows the main page of the application .
 *
 * @beta
 */
  constructor(private authService:AuthService, private route:Router){

  }
  ngOnInit():void{

  }
  
  nav() {
    /**
   * This function navigates to login component when the user logout.
   *
   * @returns A Promise that resolves to true when navigation succeeds, to false when navigation fails, or is rejected on error.
   */
    this.route.navigate(['/login']);
  }
  sign_out(){
    /**
   * This function logs out the user when they click the log out button.
   *
   * @returns A Promise that resolves to true when logout success and call the nav funcion, to false when logout fails, or is rejected *          on error. 
   *                                                          
   */
    this.authService.sign_out().then(()=>{
      this.nav()
    })
    .catch(error=> console.log(error));
    
  }
}
