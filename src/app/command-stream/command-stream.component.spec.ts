import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandStreamComponent } from './command-stream.component';

describe('CommandStreamComponent', () => {
  let component: CommandStreamComponent;
  let fixture: ComponentFixture<CommandStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
