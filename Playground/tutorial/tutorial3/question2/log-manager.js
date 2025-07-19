import { dir, time } from "console";
import fs from "fs";
import { monitorEventLoopDelay } from "perf_hooks";

export class LogManager {
  constructor(parameters) {}
  async creating_log_directory_structure() {
    console.log(`Creating log directory structure...`);

    // try to create the directory
    this.mkdir(`new-directory`);
    for (const subfolder of [`error`, `info`, `debug`]) {
      await this.mkdir(`new-directory/${subfolder}`);
    }

    // writing log entry
    console.log(``);

    console.log(`Writing log entry ...`);

    const append = await this.login_procedure(
      `new-directory/info/${await this.date_to_file_name()}.log`
    );

    await this.delay();
    console.log(`✓ Log entry written to ${append}`);

    await this.generate_old_log_files(
      `C:/Users/yinji/Documents/VS_code/Full_Stack_Website_Developer/Playground/tutorial/tutorial3/question2/new-directory/info`
    );

    console.log(`Cleaning old logs ...`);
    await this.remove_old_files(
      `C:/Users/yinji/Documents/VS_code/Full_Stack_Website_Developer/Playground/tutorial/tutorial3/question2/new-directory/info`,
      new Date()
    );

    return;
  }
  /**
   *
   * @param {String} directory
   * @returns
   */
  async mkdir(directory) {
    await fs.mkdir(directory, { recursive: true }, (err) =>
      this.error_handler(err, `creating directory`)
    );
    console.log(`✓ Created directory: ${directory}`);
    return;
  }
  /**
   *
   * @param {String} directory
   * @param {String} content
   */
  async write(directory, content) {
    fs.writeFile(directory, content, `utf-8`, (err) =>
      this.error_handler(err, `writing file`)
    );
    return { directory, content };
  }
  async append(directory, content) {
    fs.appendFile(directory, content, `utf-8`, (err) =>
      this.error_handler(err, `append file`)
    );
  }
  /**
   *
   * @param {*} error
   * @param {`creating directory`|`writing file`|`append file`|`remove file`|`fetch file`} error_type
   */
  async error_handler(error, error_type) {
    if (error) {
      console.log(`Error ${error_type}: `);
      console.error(error);
      return;
    }
  }
  /**
   *
   * @param {Date} timestamp
   * @returns {String}
   */
  async log_timestamp(timestamp) {
    const log_timestamp = {
      year: timestamp.getFullYear(),
      month: (timestamp.getMonth() + 1).toString().padStart(2, `0`),
      date: timestamp.getDate().toString().padStart(2, `0`),
      hour: timestamp.getHours().toString().padStart(2, `0`),
      minute: timestamp.getMinutes().toString().padStart(2, `0`),
      second: timestamp.getSeconds().toString().padStart(2, `0`),
    };
    const { year, month, date, hour, minute, second } = log_timestamp;
    return `[${[year, month, date].join(`-`)} ${[hour, minute, second].join(
      `:`
    )}]`;
  }
  /**
   *
   * @param {String} directory
   */
  async login_procedure(directory) {
    const login_procedure = {
      list: {
        action: [
          `User login successful`,
          `Database connection established`,
          `API request processed`,
        ],
        console: [],
      },
      gap_time: Math.floor(1000 + Math.random() * 1000),
    };
    await this.append(directory,`\n`)
    for (const [index, action] of login_procedure.list.action.entries()) {
      await this.delay(login_procedure.gap_time);
      await this.append(
        directory,
        `${await this.log_timestamp(new Date())} ${action}\n`
      );
      login_procedure.list.console = await [
        ...login_procedure.list.console,
        `${await this.log_timestamp(new Date())} ${action}`,
      ];
    }
    return directory;
  }
  async delay(second = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, second);
    });
  }
  /**
   *
   * @param {String} directory
   * @returns {String}
   */
  async remove(directory) {
    fs.unlink(directory, (err) => this.error_handler(err, `remove file`));
    return directory;
  }
  /**
   * @param {String} folder_directory
   * @param {Date} date
   * @param {Number} day
   */
  async remove_old_files(folder_directory, date = new Date(), day = 3) {
    date.setDate(date.getDate() - day + 1);
    const file_list = await this.read_folder(folder_directory);
    let counter = 0;
    for (const file of file_list) {

      if ((await this.read_file_date(file)) < new Date(date)) {
        try {
            await this.remove(`${folder_directory}/${file}.log`);
          counter++;
        } catch (error) {
          console.error(error);
        }
      }
    }
    if (counter === 0) console.log(`No file removed`);
    console.log(`Removed ${counter} old log file(s)`);
  }
  /**
   *
   * @param {String} folder_directory
   * @returns {String[]}
   */
  async read_folder(folder_directory) {
    try {
      return (await fs.promises.readdir(folder_directory))
        .filter((i) => i.endsWith(`log`))
        .map((i) => i.split(`.log`)[0]);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   *
   * @param {String} file_name
   * @returns {Number}
   */
  async read_file_date(file_name) {
    const read_file_date = {
      year: parseInt(file_name.split(`-`)[0]),
      month: parseInt(file_name.split(`-`)[1]),
      day: parseInt(file_name.split(`-`)[2]),
    };
    const { year, month, day } = read_file_date;

    return new Date().setFullYear(year, month - 1, day + 1);
  }
  /**
   *
   * @param {String} folder_directory
   * @param {Number} generate_ammount
   */
  async generate_old_log_files(
    folder_directory,
    generate_ammount = Math.floor(3 + Math.random() * 5)
  ) {
    console.log(`Generating Old Files ...`);

    const date = {
      start: new Date(),
      date: new Date(),
      index_jump: 0,
    };
    for (let index = 1; index <= generate_ammount; index++) {
      date.date.setDate(date.date.getDate() - 1 - date.index_jump);

      if (Math.random() < 0.2) {
        date.index_jump++;
      }
      if (Math.random() < 0.1) {
        date.index_jump += 2;
      }
      await this.append(
        `${folder_directory}/${await this.date_to_file_name(date.date)}.log`,
        `${await this.log_timestamp(date.date)} Testing\n`
      );
    }
    console.log(`Generated ${generate_ammount} old files ...`);
    await this.delay(0.5);
  }
  /**
   *
   * @param {Date} date
   * @returns {String} file_name
   */
  async date_to_file_name(date = new Date()) {
    const { year, month, day } = {
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString().padStart(2, `0`),
      day: date.getDate().toString().padStart(2, `0`),
    };
    return `${[year, month, day].join(`-`)}`;
  }
}

new LogManager().creating_log_directory_structure();
