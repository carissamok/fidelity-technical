import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandEntryComponent } from './command-entry.component';

describe('CommandEntryComponent', () => {
  let component: CommandEntryComponent;
  let fixture: ComponentFixture<CommandEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
