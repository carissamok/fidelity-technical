import { Component } from '@angular/core';
import { CommandService } from '../command.service';

@Component({
  selector: 'app-command-stream',
  templateUrl: './command-stream.component.html',
  styleUrls: ['./command-stream.component.css']
})
export class CommandStreamComponent {

    commands = this.commandService.getCommands();

    constructor(
      private commandService: CommandService,
    ) {}
}
