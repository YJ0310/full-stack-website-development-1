import { argv, stdout, stdin } from "node:process";
import {
  appendFile,
  mkdir,
  readdir,
  readFile,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, URL } from "node:url";

/**
 * @typedef {Object} Commands
 * @property {String} command
 * @property {String} file_name
 * @property {String[]} args
 * @property {String} file_path
 * @property {String[]} return
 * @property {String[]} data
 * @property {`command error`|`read error`|`delete error`} error
 * @property {String[]} console_error
 */
export class file_cli {
  constructor() {
    /**
     * @type {Commands}
     */
    this.commands = {};
  }
  async run() {
    await console.log(`\n`);
    await this.command_function();
  }
  async command_function() {
    await this.create_folder(`source`);
    const [command, file_name, ...args] = argv.slice(2);
    this.commands = { command, file_name, args };
    if (!this.commands.command) {
      this.commands.error = `command error`;
      return this.error_handler();
    }
    if (!this.commands.file_name) {
      try {
        await this.non_filename_command_function();
      } catch (error) {
        this.commands.error = `command error`;
        await this.error_handler();
        console.error(error);
      }
      return;
    }
    try {
      this.get_dir_name();
      console.log(this.commands.file_path);
      // return;
      switch (this.commands.command) {
        case `create`:
          await this.create();
          break;
        case `update`:
          await this.update();
          break;
        case `read`:
          await this.read();
          break;
        case `delete`:
          await this.delete();
          break;
        case `mkdir`:
          await this.mk_dir();
          break;
        case `list`:
          await this.list();
          break;
      }
      console.log(this.commands.return);
    } catch (error) {
      console.error(error);
      return;
    }
  }
  async non_filename_command_function() {
    try {
      switch (this.commands.command) {
        case `list`:
          await this.list();
          break;
        default:
          this.commands.error = `command error`;
          await this.error_handler();
      }
      console.log(this.commands.return);
    } catch (error) {
      console.error(error);
      return;
    }
  }
  async get_dir_name() {
    this.commands.file_path = join(
      dirname(
        fileURLToPath(
          new URL(
            this.commands.file_name.split(`/`).slice(-1).toString(),
            import.meta.url
          )
        )
      ),
      `source`,
      this.commands.file_name
    );
  }
  async create_folder(folder_name) {
    this.commands.return = await mkdir(
      join(dirname(fileURLToPath(import.meta.url)), folder_name),
      { recursive: true }
    );
  }
  async update() {
    this.commands.return = await appendFile(
      this.commands.file_path,
      (this.commands.args.push(`\n`), this.commands.args.join(` `))
    );
    this.commands.return = [
      `file updated`,
      `${this.commands.file_name} is updated`,
      ,
      `current content:`,
      await readFile(this.commands.file_path),
    ].join(`\n`);
  }
  async read() {
    try {
      this.commands.return = [
        `file readed`,
        `${this.commands.file_name} is readed`,
        ,
        `content:`,
        await readFile(this.commands.file_path),
      ].join(`\n`);
    } catch (error) {
      this.commands.error = `read error`;
      await this.error_handler();
      console.log(``);
      throw error;
    }
  }
  async create() {
    if (this.commands.args.toString() === ``) {
      this.commands.return = ``;
    } else {
      this.commands.return =
        (this.commands.args.push(`\n`), this.commands.args.join(` `));
    }
    await writeFile(this.commands.file_path, this.commands.return);
    this.commands.return = [
      `file created`,
      `${this.commands.file_name} is created`,
      ,
      `create content:`,
      this.commands.args.join(` `),
    ].join(`\n`);
  }
  async delete() {
    try {
      console.log(`Are you want to delete ${this.commands.file_name}? (y/n)`);
      this.commands.return = await this.comfirmation();
      if (![`yes`, `y`].includes(this.commands.return[0].toLowerCase())) {
        if ([`no`, `n`].includes(this.commands.return[0].toLowerCase())) {
          this.commands.return = `Action Canceled`;
          return;
        }
        if (!(this.commands.return[0] === ``)) {
          this.commands.error = `command error`;
          await this.error_handler();
          this.commands.return = `Action Canceled`;
          return;
        }
      }
      await unlink(this.commands.file_path);

      this.commands.return = [
        `file deleted`,
        `${this.commands.file_name} is deleted`,
      ].join(`\n`);
    } catch (error) {
      this.commands.error = `delete error`;
      await this.error_handler();
      throw error;
    }
  }
  async error_handler() {
    switch (this.commands.error) {
      case `command error`:
        this.commands.console_error = [
          this.commands.error,
          `please insert help to get the command list`,
        ];
        break;
      case `read error`:
        this.commands.console_error = [
          this.commands.error,
          `no such this file`,
        ];
        break;
      case `delete error`:
        this.commands.console_error = [
          this.commands.error,
          `unable to delete file`,
        ];
        break;
    }
    await console.log(`Error: `, this.commands.console_error.join(`\n`));
    return;
  }
  /**
   *
   * @returns {String[]}
   */
  async comfirmation() {
    stdin.setEncoding(`utf-8`);
    return new Promise((resolve, reject) => {
      stdin.once(`data`, (data) => {
        stdin.pause();
        resolve([data.toString().trim()]);
      });
    });
  }
  async list() {
    if (!this.commands.file_name) {
      this.commands.file_path = join(
        dirname(fileURLToPath(import.meta.url)),
        `source`
      );
    } else {
      await this.get_dir_name();
    }
    try {
      this.commands.return = await readdir(this.commands.file_path);
      await this.check_folder();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async mk_dir() {
    this.commands.return = await mkdir(
      join(
        dirname(fileURLToPath(import.meta.url)),
        `source`,
        this.commands.file_name
      ),
      { recursive: true }
    );

    this.commands.return = [`Folder ${this.commands.file_name} created`].join(
      `\n`
    );
  }
  async check_folder() {
    /**
     * @typedef {Object[]} return_value
     * @property {String} name
     * @property {Boolean} is_folder
     */
    const return_value = [];
    for (const entry of this.commands.return) {

      this.commands.file_name = join(this.commands.file_path,entry);
      return_value.push({
        name: entry,
        is_folder: (await stat(this.commands.file_name)).isDirectory(),
      });
    }
    return_value.sort((a, b) => b.is_folder - a.is_folder);
    this.commands.return = [];
    for (const return_value_item of return_value) {
      if (return_value_item.is_folder === true) {
        this.commands.return.push(`📁 ${return_value_item.name}/`);
      } else {
        this.commands.return.push(`📄 ${return_value_item.name}`);
      }
    }
    if (this.commands.return.length===0) {
      return this.commands.return = `No Files in this directory`
    }
    this.commands.return = this.commands.return.join(`\n`);
  }
}

new file_cli().run();
// new file_cli().list();
