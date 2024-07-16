import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefaultComponent } from './list-default.component';
import { ProductDefaultService } from 'src/app/services/productsdefault.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ListDefaultComponent', () => {
  let component: ListDefaultComponent;
  let fixture: ComponentFixture<ListDefaultComponent>;
  let productService: jasmine.SpyObj<ProductDefaultService>;
  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductDefaultService', ['getProducts']);
    TestBed.configureTestingModule({
      declarations: [ListDefaultComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ProductDefaultService, useValue: productService},
      ]    });
    fixture = TestBed.createComponent(ListDefaultComponent);
    component = fixture.componentInstance;
    productService.getProducts.and.returnValue(Promise.resolve([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
