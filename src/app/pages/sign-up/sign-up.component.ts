import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
   /**
   * This class component shows the login page of the application .
   * @param formLog - Tracks the value and validity state of a group of FormControl instances.
   * @param errorMessageVisible - boolean who displays a error message
   * @param successMessageVisible - boolean who displays a success message
   * @beta  
   */
  formReg:FormGroup;
  errorMessageVisible: boolean = false;
  successMessageVisible: boolean = false;

    constructor(private authService:AuthService,private route:Router){
      this.formReg = new FormGroup({
        email: new FormControl(), 
        password: new FormControl()
      })
    }
    ngOnInit(): void{

    }
    nav() {
        /**
     * This function navigates to email verification component when the user login.
     *
     * @returns A Promise that resolves to true when navigation succeeds, to false when navigation fails, or is rejected on error.
     */
      this.route.navigate(['/email-verification']);
    }
    onSubmit() {
       /**
     * Function for register with email and password when the user click register
     *
     * @returns A Promise that resolves to true when user´s register succeeds and send email verification , to false when user´s
     * register fails, or is rejected on error.
     */
      if(this.formReg.valid){
      this.authService.createUserWithEmailAndPassword(this.formReg.value)
      .then(response => {
        this.successMessageVisible = true;
        setTimeout(() => {
          this.successMessageVisible = false;
        }, 5000);
        this.authService.sendEmailVerification()
        this.nav()
      })
      .catch(error =>  {this.errorMessageVisible = true
        setTimeout(() => {
          this.errorMessageVisible = false;
        }, 5000);
      });
    }
  }
}
