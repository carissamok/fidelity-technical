import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommandService } from '../command.service';
import { Command } from '../commands';

@Component({
  selector: 'app-command-summary',
  templateUrl: './command-summary.component.html',
  styleUrls: ['./command-summary.component.css'],
})
export class CommandSummaryComponent implements OnInit, OnDestroy {
  commands = this.commandService.getCommands();
  old_commands: Command[] = [];
  id = 0;

  // variables called from the html file to display
  total_quantity = 0;
  total_commands = 0;
  rate_sum = 0;
  avg_rate = 0;
  combinable = 0;
  combined_entries: any;
  target_entries: any;
  weapon_entries: any;

  // maps that hold information about attacks and are used as reference when new commands come in
  combined_attacks = new Map<any, any>();
  target_attacks = new Map<any, any>();
  weapon_attacks = new Map<any, any>();

  constructor(
    private commandService: CommandService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = window.setInterval(() => {
      this.getSummary();
    }, 60000);

    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  getSummary() {
    // check to see if any new commands have been added
    let num_new_commands = this.commands.length - this.old_commands.length;

    // only run the bulk of getSummary if any new commands have been added 
    if (num_new_commands != 0) {

      // track total rate and quantity
      let curr_quantity = this.total_quantity;
      let curr_rate_sum = this.avg_rate * this.old_commands.length;

      // maps rate and quantity based on combined attacks, targets, or weapons to local method variable so it doesn't update while iterating through individual commands
      let curr_combined_attacks = this.combined_attacks;
      let target_summary = this.target_attacks;
      let weapon_summary = this.weapon_attacks;

      // only iterate through new commands
      for (let i = this.commands.length - num_new_commands; i < this.commands.length; i++) {
        let currCommand = this.commands[i];
        curr_quantity = curr_quantity + currCommand.quantity;
        curr_rate_sum = curr_rate_sum + currCommand.rate

        this.combineAttack(currCommand, curr_combined_attacks);
        this.getTargetSummary(currCommand, target_summary);
        this.getWeaponSummary(currCommand, weapon_summary);
      }

      // stats for executive summary
      let combined_attacks = Array.from(curr_combined_attacks.entries()).filter(
        (attack) => attack[1].numCombined > 0
      );
      // set updated combined attacks to display variable
      this.combinable = combined_attacks.length;
      this.combined_entries = this.cleanCommands(
        Array.from(combined_attacks.entries())
      );

      this.avg_rate = curr_rate_sum / this.commands.length ? +(curr_rate_sum / this.commands.length).toFixed(2) : 0;
      this.total_quantity = curr_quantity;
      this.total_commands = this.commands.length;

      // set updated target attacks to display variable
      this.target_entries = Array.from(target_summary.entries());

      // set updated weapon attacks to display variable
      this.weapon_entries = Array.from(weapon_summary.entries());

      // update old_commands local variable to include additional commands
      this.old_commands = this.commands.slice();
    }
  }

  // combines a single command with commands in the map, or adds it as an entry if there are no commands to combine with 
  combineAttack(command: Command, curr_combined_attacks: Map<any, any>): void {
    let comparedData = {
      battleship: command.battleship,
      weapon: command.weapon_system,
      target: command.target,
    };

    let stringified = JSON.stringify(comparedData);

    if (curr_combined_attacks.has(stringified)) {
      let currData = curr_combined_attacks.get(stringified);
      currData.quantity = currData.quantity + command.quantity;
      currData.numCombined = currData.numCombined + 1;
      currData.rate = +((currData.rate * currData.numCombined) + command.rate) / (currData.numCombined + 1).toFixed(2);
      

      curr_combined_attacks.set(stringified, currData);
    } else {
      curr_combined_attacks.set(stringified, {
        quantity: command.quantity,
        rate: command.rate,
        numCombined: 0,
      });
    }
  }

  // converts map of combined commands into array of commands
  cleanCommands(commands: Array<any>): Array<Command> {
    let cleaned = [];
    for (let i = 0; i < commands.length; i++) {
      let comm = commands[i][1];
      let parsed = JSON.parse(comm[0]);
      let newRow = { ...parsed, ...comm[1] };
      cleaned.push(newRow);
    }
    return cleaned;
  }

  // adds a command to the target map based on combinability
  getTargetSummary(command: Command, target_summary: Map<any, any>): void {
    if (target_summary.has(command.target)) {
      let currData = target_summary.get(command.target);
      currData.quantity = currData.quantity + command.quantity;
      // keep track of how many attacks for this specific target so we can calculate rate
      currData.numAttacks = currData.numAttacks + 1;
      currData.rate = +(
        (currData.rate * (currData.numAttacks - 1) + command.rate) /
        currData.numAttacks
      ).toFixed(2);
    } else {
      target_summary.set(command.target, {
        quantity: command.quantity,
        rate: command.rate,
        numAttacks: 1,
      });
    }
  }

  // adds a command to the weapon map based on combinability
  getWeaponSummary(command: Command, weapon_summary: Map<any, any>): void {
    if (weapon_summary.has(command.weapon_system)) {
      let currData = weapon_summary.get(command.weapon_system);
      currData.quantity = currData.quantity + command.quantity;
      // keep track of how many attacks for this specific weapon so we can calculate rate
      currData.numAttacks = currData.numAttacks + 1;
      currData.rate = +(
        (currData.rate * (currData.numAttacks - 1) + command.rate) /
        currData.numAttacks
      ).toFixed(2);
    } else {
      weapon_summary.set(command.weapon_system, {
        quantity: command.quantity,
        rate: command.rate,
        numAttacks: 1,
      });
    }
  }
}
