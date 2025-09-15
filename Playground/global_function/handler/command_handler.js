import fs from "fs/promises";
import { File_system } from "../filesystem/filesystem.js";
import {} from "../inquirer/inquirer.js";
import global from "../_manager.js";
import { join } from "path";
import { pathToFileURL } from "url";

/**
 * @typedef command
 * @property {string} name
 * @property {string} [description=name]
 * @property {boolean} [argument_require=false]
 * @property {Function} execute
 * @property {"common"|"database"|"test"} [category="common"]
 */

export class Command_Handler {
  constructor() {}
  static async test(dirname = import.meta.dirname) {
    let value;

    value = await this.ask_and_execute(await this.get_command(dirname));

    return value;
  }

  static async get_command(dirname = import.meta.dirname) {
    let commands;

    commands = (await fs.readdir(dirname)).filter(
      (i) => !["node_modules", "package-lock.json", "package.json"].includes(i)
    );

    for (let index = 0; index < commands.length; index++) {
      if ((await fs.stat(join(dirname, commands[0]))).isDirectory() === true) {
        commands.push(await this.get_command(join(dirname, commands[0])));
      } else if (commands[0].endsWith(".js")) {
        let module = await import(pathToFileURL(join(dirname, commands[0])));

        if (module.command instanceof Command) {
          await commands.push(module.command);
        }
      }
      commands = commands.slice(1);
    }
    commands = commands.flat().filter(i=>i.execute);
    return commands;
  }

  /**
   *
   * @param {command[]} commands
   */
  static async ask_and_execute(commands) {
    let value;


    value = await global.inquirer.select(
      "Select a command to execute",
      commands.map((i) => {
        return {
          value: i.name,
        };
      })
    );

    return commands.find(i=>i.name===value).execute();
  }
}

export class Command {
  /**
   *
   @param {command} command 
   */
  constructor(command) {
    this.name = command.command_name;
    this.category = command.category || "common";
    this.description = command.command_description || command.command_name;
    this.argument_require = command.argument_require || false;
    this.execute = command.execute;
  }
}
