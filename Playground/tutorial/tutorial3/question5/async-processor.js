export class async_processor {
  constructor() {
    /**
     * @typedef {Object} args
     * @property {String} data
     * @property {Function} callback
     * @property {String} return_value``
     */
    /**@type {args} */
    this.args = {
      data: `Hello World`,
      callback: `callback`,
      return_value: ``,
    };
  }
  async run() {
    console.log(`Starting async processing demonstration...`);
    console.log(``);
    console.log(`=== Callback Pattern ===`);
    await this.callback_pattern();
    console.log(``);
    console.log(`=== Promise Pattern ===`);
    await this.promise_pattern();
  }
  async command_handler() {}
  async process_data_callback() {
    if (this.args.data === null) {
      return this.error_handler(`no data`);
    }
    await this.delay();
    return this.args.data;
  }
  /**
   *
   * @param {null|`Callback Pattern`|`Promise Pattern`} print_type
   * @param {null|`callbacks`|`promises`} print_type_2
   * @param {null|`return_value`} print_type_3
   */
  async line_printer(
    print_type = null,
    print_type_2 = null,
    print_type_3 = null
  ) {
    console.log();
    console.log(`=== ${print_type} ===`);
    if (print_type_2 !== null) {
      console.log(`Processing data with ${print_type_2}...`);
    }
    if (print_type_3 !== null) {
      console.log(`✓ Data processed successfully: ${this.args.return_value}`);
    }
  }
  async delay(time = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time * 1000);
    });
  }
  /**
   *
   * @param {`no data`} error_type
   * @param {Error} error
   */
  async error_handler(error_type, error) {
    const error_db = {
      error_type: [`no data`],
      error_output: [`no data`],
    };
    if (!error_db.error_type.includes(error_type)) {
      console.error(`Error: Unknown Error`);
      console.error(error);
      return;
    }
    console.error(
      `Error: ${error_db.error_output[error_db.error_type.indexOf(error_type)]}`
    );
    console.error(error);
  }
  async callback_pattern() {
    console.log(`Processing data with callback ...`);
    await this.delay();
    console.log(`✓ Data processed successfully: [processed] ${this.args.data}`);
  }
  async promise_pattern() {
    console.log(`Processing data with promises ...`);
    await this.delay();
    console.log(`✓ Data processed successfully: [processed] ${this.args.data}`);
  }
}

new async_processor().run();
