import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta
import { SignUpComponent } from './sign-up.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let translateService: jasmine.SpyObj<TranslateService>;
  //let mockRouterSignUp:any
  beforeEach(() => {
    translateService = jasmine.createSpyObj('TranslateService', ['get']);
      const translateServiceMock = {
        currentLang: 'es',
        onLangChange: new EventEmitter<LangChangeEvent>(),
        use: translateService.get,
        get: translateService.get.and.returnValue(of('Tranlated Text')),
        onTranslationChange: new EventEmitter(),
        onDefaultLangChange: new EventEmitter()
      };
    //mockRouterSignUp = { navigate: jasmine.createSpy('navigate') };
    authServiceSpy = jasmine.createSpyObj('AuthService', ['createUserWithEmailAndPassword']);
    (authServiceSpy.createUserWithEmailAndPassword as jasmine.Spy).and.returnValue(Promise.resolve({ user: { uid: 'testUid' } }));
    
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
          [RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }])],
          TranslateModule.forRoot(),
        ], 
      declarations: [SignUpComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        //{ provide: Router, useValue: mockRouterSignUp},
        {provide: TranslateService, useValue: translateServiceMock}

      ]
    
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call create user with email and password', async () => {
    const email = 'test@example.com';
    const password = 'testPassword';
    component.formReg.controls['email'].setValue(email);
    component.formReg.controls['password'].setValue(password);

    await component.onSubmit();
    expect(authServiceSpy.createUserWithEmailAndPassword).toHaveBeenCalledWith({email, password});

  });

  it('should handle user creation error', async () => {
    const email = 'test@example.com';
    const password = 'testPassword';
    component.formReg.controls['email'].setValue(email);
    component.formReg.controls['password'].setValue(password);
  
    authServiceSpy.createUserWithEmailAndPassword.and.returnValue(Promise.reject(new Error('Failed to create user')));
    await component.onSubmit();
    expect(authServiceSpy.createUserWithEmailAndPassword).toHaveBeenCalledWith({ email, password });
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(component.errorMessageVisible).toBe(true); 
  });

  it('should handle successful user creation', async () => {
    const email = 'test@example.com';
    const password = 'testPassword';
    component.formReg.controls['email'].setValue(email);
    component.formReg.controls['password'].setValue(password);
  
    await component.onSubmit();
    
    expect(authServiceSpy.createUserWithEmailAndPassword).toHaveBeenCalledWith({ email, password });
    expect(component.successMessageVisible).toBe(true);
   
  });
  /* Da error si asignas valores invalidos, si le dejas vacio no, por la el required de los input
  it('should show error messages for invalid form', async () => {
    //component.formReg.controls['email'].setValue('invalid-email'); // Correo electrónico inválido
    //component.formReg.controls['password'].setValue('short'); // Contraseña demasiado corta
  
    await component.onSubmit();
  
    expect(authServiceSpy.createUserWithEmailAndPassword).not.toHaveBeenCalled(); // Asegurarse de que no se haya llamado al servicio
    expect(component.formReg.valid).toBeFalse(); // Asegurarse de que el formulario sea inválido
  });

  it('should navigate to email-verification', () => {
   
    component.nav();
    expect(mockRouterSignUp.navigate).toHaveBeenCalledWith(['/email-verification']);
  });*/
  
});
