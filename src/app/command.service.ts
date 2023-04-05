import { Injectable } from '@angular/core';
import { Command } from './commands';

@Injectable({
  providedIn: 'root'
})
// keeps track of inputted commands
export class CommandService {

  constructor() { }

  commands: Command[] = [];

  addCommand(command: Command) {
    this.commands.push(command);
  }

  getCommands() {
    return this.commands;
  }
}
