import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkitemComponent } from './linkitem.component';

describe('LinkitemComponent', () => {
  let component: LinkitemComponent;
  let fixture: ComponentFixture<LinkitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
