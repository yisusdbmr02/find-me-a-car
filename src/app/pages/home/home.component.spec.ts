import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let mockRouter: any;
  let translateService: jasmine.SpyObj<TranslateService>;

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

    mockRouter = { navigate: jasmine.createSpy('navigate') };
    authService = jasmine.createSpyObj('AuthService', ['sign_out']);
    (authService.sign_out as jasmine.Spy).and.returnValue(Promise.resolve({ user: { uid: 'testUid' } }));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
        TranslateModule.forRoot(),
      ],
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: mockRouter },
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signOut user and go login', () => {
    component.sign_out();
    component.nav();
    expect(authService.sign_out).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
