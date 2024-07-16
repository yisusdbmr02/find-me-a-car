import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { HomeComponent } from './pages/home/home.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ListDefaultComponent } from './pages/list-default/list-default.component';

const routes: Routes = [
  //{path: '', pathMatch:'full', redirectTo:'/main' },
  {path: 'login', component: LoginComponent},
  {path: 'main', component:MainComponent },
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot', component:ForgotComponent },
  {path: 'email-verification', component:EmailVerificationComponent },
  {path: 'list-default', component:ListDefaultComponent },
  {path: 'home', component: HomeComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
