import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { EmailVerificationComponent } from '../email-verification/email-verification.component';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let mockRouter:any;
    beforeEach(() => {
      mockRouter = { navigate: jasmine.createSpy('navigate') };
      translateService = jasmine.createSpyObj('TranslateService', ['get']);
      const translateServiceMock = {
        currentLang: 'es',
        onLangChange: new EventEmitter<LangChangeEvent>(),
        use: translateService.get,
        get: translateService.get.and.returnValue(of('Tranlated Text')),
        onTranslationChange: new EventEmitter(),
        onDefaultLangChange: new EventEmitter()
      };
      authService = jasmine.createSpyObj('AuthService', ['signInWithEmailAndPassword','signInWithGoogle','signInWithFacebook','signInWithTwitter']);
      (authService.signInWithEmailAndPassword as jasmine.Spy).and.returnValue(Promise.resolve({ user: { uid: 'testUid' } }));
      (authService.signInWithGoogle as jasmine.Spy).and.returnValue(Promise.resolve({} as any));
      (authService.signInWithFacebook as jasmine.Spy).and.returnValue(Promise.resolve({} as any));
      (authService.signInWithTwitter as jasmine.Spy).and.returnValue(Promise.resolve({} as any));
      const currentUser = { email: 'test@example.com' };
      authService.auth = { currentUser: Promise.resolve(currentUser) } as any;
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule,
          RouterTestingModule.withRoutes(
            [{path: 'home', component: HomeComponent},
            {path: 'email-verification', component: EmailVerificationComponent}]
            
          ),
          TranslateModule.forRoot(),
        ], 
        declarations: [LoginComponent],
        providers: [
          { provide: AuthService, useValue: authService},
          //{ provide: Router, useValue: mockRouter },
          {provide: TranslateService, useValue: translateServiceMock}
        ],
      
      });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should call signIn user with email and password', async () => {
      const email = 'test@example.com';
      const password = 'testPassword';
      component.formLog.controls['email'].setValue(email);
      component.formLog.controls['password'].setValue(password);
  
      await component.onSubmit();
      expect(authService.signInWithEmailAndPassword).toHaveBeenCalledWith({email, password});
    });
    it('should handle user creation error', async () => {
      const email = 'test@example.com';
      const password = 'testPassword';
      component.formLog.controls['email'].setValue(email);
      component.formLog.controls['password'].setValue(password);
    
      authService.signInWithEmailAndPassword.and.returnValue(Promise.reject(new Error('Failed to create user')));
      await component.onSubmit();
      expect(authService.signInWithEmailAndPassword).toHaveBeenCalledWith({ email, password });
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(component.errorMessageVisible).toBe(true); // Asumiendo que el componente muestra un mensaje de error
    });
  
    it('should handle successful user creation', async () => {
      const email = 'test@example.com';
      const password = 'testPassword';
      component.formLog.controls['email'].setValue(email);
      component.formLog.controls['password'].setValue(password);
    
      await component.onSubmit();
    
      expect(authService.signInWithEmailAndPassword).toHaveBeenCalledWith({ email, password });
      expect(component.successMessageVisible).toBe(true); // Asumiendo que el componente muestra un mensaje de éxito
      // También podrías verificar si el componente redirige a la página de inicio de sesión
    });
    it('should sign in with Google', async () => {
      
      await component.signInWithGoogle();

      expect(authService.signInWithGoogle).toHaveBeenCalled();
      // También podrías verificar el comportamiento posterior a la autenticación
    });
    it('should sign in with Facebook', async () => {
      
      await component.signInWithFacebook();

      expect(authService.signInWithFacebook).toHaveBeenCalled();
      // También podrías verificar el comportamiento posterior a la autenticación
    });
    it('should sign in with Twitter', async () => {
      
      await component.signInWithTwitter();

      expect(authService.signInWithTwitter).toHaveBeenCalled();
      // También podrías verificar el comportamiento posterior a la autenticación
    });
    
    it('should navigate to home',async () => {
      fixture.detectChanges();
      component.navHome();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']); 
    });
  });
