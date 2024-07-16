import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  /**
   * This class component shows the login page of the application .
   * @param formLog - Tracks the value and validity state of a group of FormControl instances.
   * @param errorMessageVisible - boolean who displays a error message
   * @param successMessageVisible - boolean who displays a success message
   * @param user - Boolean variable to check the email status, true if is Verified, false if isn´t verified 
   * @beta  
   */
  formLog: FormGroup;
  user = this.authService.auth.currentUser?.emailVerified;
  errorMessageVisible: boolean = false;
  successMessageVisible: boolean = false;
  constructor(private authService: AuthService, private route: Router) {
    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  ngOnInit(): void {}
  navHome() {
    /**
     * This function navigates to home component when the user login.
     *
     * @returns A Promise that resolves to true when navigation succeeds, to false when navigation fails, or is rejected on error.
     */
    this.route.navigate(['/home']);
  }
  navEmailVer() {
    /**
     * This function navigates to email verification component when the user login for first time.
     *
     * @returns A Promise that resolves to true when navigation succeeds, to false when navigation fails, or is rejected on error.
     */
    this.route.navigate(['/email-verification']);
  }
  //
  onSubmit() {
    /**
     * Function for sign In with email and password when the user click login
     *
     * @returns A Promise that resolves to true when user´s login succeeds, to false when user´s login fails, or is rejected on error.
     */
    if (this.formLog.valid) {
      this.authService
        .signInWithEmailAndPassword(this.formLog.value)
        .then((response) => {
          console.log(response);
          this.successMessageVisible = true;
          setTimeout(() => {
            this.successMessageVisible = false;
          }, 5000);
          if (this.user == true) this.navHome();
          else this.navEmailVer();
        })
        .catch((error) => {
          this.errorMessageVisible = true;
          setTimeout(() => {
            this.errorMessageVisible = false;
          }, 5000);
        });
    }
  }
  //
  signInWithGoogle() {
    /**
     * Function for sign In with google when the user click sign in with google
     *
     * @returns A Promise that resolves to true when user´s login succeeds, to false when user´s login fails, or is rejected on error.
     */
    this.authService
      .signInWithGoogle()
      .then((response) => {
        console.log(response);
        this.navHome();
      })
      .catch((error) => console.log(error));
  }
  signInWithFacebook() {
     /**
     * Function for sign In with facebook when the user click sign in with facebook
     *
     * @returns A Promise that resolves to true when user´s login succeeds, to false when user´s login fails, or is rejected on error.
     */
    this.authService
      .signInWithFacebook()
      .then((response) => {
        console.log(response);
        this.navHome();
      })
      .catch((error) => console.log(error));
  }
  signInWithTwitter() {
     /**
     * Function for sign In with twitter when the user click sign in with twitter
     *
     * @returns A Promise that resolves to true when user´s login succeeds, to false when user´s login fails, or is rejected on error.
     */
    this.authService
      .signInWithTwitter()
      .then((response) => {
        console.log(response);
        this.navHome();
      })
      .catch((error) => console.log(error));
  }
}
