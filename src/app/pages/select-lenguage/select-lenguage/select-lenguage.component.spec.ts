import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core'; // Asegúrate de importar el módulo
import { SelectLenguageComponent } from './select-lenguage.component';

describe('SelectLenguageComponent', () => {
  let component: SelectLenguageComponent;
  let fixture: ComponentFixture<SelectLenguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectLenguageComponent],
      imports: [TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(SelectLenguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
