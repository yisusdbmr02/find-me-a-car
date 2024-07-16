import { NgModule,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import {PasswordModule} from "primeng/password";
import { HomeComponent } from './pages/home/home.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SelectLenguageComponent } from './pages/select-lenguage/select-lenguage/select-lenguage.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ListDefaultComponent } from './pages/list-default/list-default.component';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ProductDefaultService } from './services/productsdefault.service';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent, LoginComponent, MainComponent, EmailVerificationComponent, SignUpComponent, ForgotComponent, HomeComponent, SelectLenguageComponent, ListDefaultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ButtonModule,
    MenubarModule,
    ButtonModule,
    PasswordModule,
    CardModule,
    RatingModule,
    TagModule,
	ImageModule,    
    HttpClientModule,
    DataViewModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() =>getAuth()),
    AppRoutingModule
  ],
  providers: [  
    {
    provide: LOCALE_ID,
    useValue: 'fr' // 'de' for Germany, 'fr' for France ...
   },
  ProductDefaultService], // 'de' for Germany, 'fr' for France ...],],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
  
 }
