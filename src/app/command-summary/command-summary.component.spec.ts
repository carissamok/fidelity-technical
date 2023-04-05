import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandSummaryComponent } from './command-summary.component';

describe('CommandSummaryComponent', () => {
  let component: CommandSummaryComponent;
  let fixture: ComponentFixture<CommandSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
