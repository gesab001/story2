import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JigsawComponent } from './jigsaw.component';

describe('JigsawComponent', () => {
  let component: JigsawComponent;
  let fixture: ComponentFixture<JigsawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JigsawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JigsawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
