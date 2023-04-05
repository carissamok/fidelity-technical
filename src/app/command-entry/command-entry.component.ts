import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommandService } from '../command.service';

@Component({
  selector: 'app-command-entry',
  templateUrl: './command-entry.component.html',
  styleUrls: ['./command-entry.component.css'],
})
export class CommandEntryComponent {

  commands = this.commandService.getCommands();

  commandForm = this.formBuilder.group({
    weapon_system: '',
    battleship: '',
    target: '',
    quantity: undefined,
    rate: undefined
  });

  constructor(
    private commandService: CommandService,
    private formBuilder: FormBuilder
  ) {}

  // takes information from form value fields and creates a Command object to add to list of commands
  onSubmit(): void {

    var command = {
      id: new Date().getTime() as number,
      weapon_system: this.commandForm.value.weapon_system as string,
      battleship: this.commandForm.value.battleship as string,
      target: this.commandForm.value.target as string,
      quantity: this.commandForm.value.quantity as number,
      rate: this.commandForm.value.rate as number,
    }

    this.commandService.addCommand(command)
    this.commandForm.reset();
  }
}
