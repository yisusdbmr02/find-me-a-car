import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
  providers:[]
})

export class EmailVerificationComponent {
  /**
 * This class component shows the email verification page of the application .
 *
 */
  constructor(private authService:AuthService){

  }
  /**
 * @param user - display the user's email
 * 
 */
  public user = this.authService.auth.currentUser?.email

  onSendEmail():void{
  /**
  * Function that sends an email to the user to verify the email
  *
  */
    this.authService.sendEmailVerification()
  }
}
