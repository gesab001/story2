import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorygameComponent } from './memorygame.component';

describe('MemorygameComponent', () => {
  let component: MemorygameComponent;
  let fixture: ComponentFixture<MemorygameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorygameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorygameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
