import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListMonthComponent } from './note-list-month.component';

describe('NoteListMonthComponent', () => {
  let component: NoteListMonthComponent;
  let fixture: ComponentFixture<NoteListMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteListMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
