import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabledemoComponent } from './tabledemo.component';

describe('TabledemoComponent', () => {
  let component: TabledemoComponent;
  let fixture: ComponentFixture<TabledemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabledemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabledemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
