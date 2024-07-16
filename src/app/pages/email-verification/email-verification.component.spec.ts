import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailVerificationComponent } from './email-verification.component';
import { AuthService } from 'src/app/services/auth.service';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

describe('EmailVerificationComponent', () => {
  let component: EmailVerificationComponent;
  let fixture: ComponentFixture<EmailVerificationComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let translateService: jasmine.SpyObj<TranslateService>;
  beforeEach(() => {
    translateService = jasmine.createSpyObj('TranslateService', ['get']);
      const translateServiceMock = {
        currentLang: 'es',
        onLangChange: new EventEmitter<LangChangeEvent>(),
        use: translateService.get,
        get: translateService.get.and.returnValue(of('Translated Text')),
        onTranslationChange: new EventEmitter(),
        onDefaultLangChange: new EventEmitter(),
        instant: translateService.instant,
      };
    authService = jasmine.createSpyObj('AuthService', ['sendEmailVerification']);
    const currentUser = { email: 'test@example.com' };
    authService.auth = { currentUser: Promise.resolve(currentUser) } as any;
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      declarations: [EmailVerificationComponent],
      providers: [{ provide: AuthService, useValue: authService},
        {provide: TranslateService, useValue: translateServiceMock}
      ],
     
    });
    fixture = TestBed.createComponent(EmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
