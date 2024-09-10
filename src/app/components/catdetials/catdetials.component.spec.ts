import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatdetialsComponent } from './catdetials.component';

describe('CatdetialsComponent', () => {
  let component: CatdetialsComponent;
  let fixture: ComponentFixture<CatdetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatdetialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatdetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
