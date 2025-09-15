import {
  checkbox,
  confirm,
  input,
  password,
  search,
  select,
} from "@inquirer/prompts";

export class inquirer {
  constructor() {}
  /**
   *
   * @static
   * @param {string} message
   * @param {string} [default_text=null]
   * @param {boolean} [required=false]
   * @returns
   * @description get user answer
   */
  static async input(message, default_text = null, required = true) {
    return input({
      message: message,
      default: default_text,
      required: required,
    });
  }

  /**
   *
   * @static
   * @param {string} message
   * @param {{value: *,name?: string,description?: string,short?:string,disabled?:boolean}[]} choice
   * @param {string} default_text
   * @param {number} page_size
   * @param {boolean} loop
   * @param {{navigation:string,paper:string}} instructions
   * @returns
   * @description let user choose
   */
  static async select(
    message,
    choice,
    default_text = null,
    page_size = 7,
    loop = false,
    instructions = { navigation: null, paper: null }
  ) {
    return select({
      message: message,
      choices: choice,
      default: default_text,
      pageSize: page_size,
      loop: loop,
      instructions: instructions,
    });
  }

  /**
   *
   * @static
   * @param {string} message
   * @param {{value:*,name?:string,description?:string,short?:string,checked?:boolean,disabled?:boolean|string}[]} choice - only string[] are allowed
   * @param {number} page_size
   * @param {boolean} loop
   * @param {boolean} require
   * @returns
   * @description let user choose many
   */
  static async checkbox(
    message,
    choice,
    page_size = 7,
    loop = false,
    require = false
  ) {
    return checkbox({
      message: message,
      choices: choice.map((i) => ({ value: i, name: i.toString() })),
      pageSize: page_size,
      loop: loop,
      required: require,
    });
  }

  /**
   *
   * @static
   * @param {string} message
   * @param {boolean} default_text
   * @returns
   * @description confirm with user
   */
  static async confirm(message, default_text = null) {
    return confirm({
      message: message,
      default: default_text,
    });
  }

  /**
   *
   * @static
   * @param {string} message
   * @param {boolean} mask
   * @returns
   * @description input but with privacy
   */
  static async password(message, mask = true) {
    return password({ message: message, mask: mask });
  }

  static async press_any_key_to_continue() {
    await input({ message: "Press Any Key To Continue ...\n" });
  }

  /**
   *
   * @param {string} message
   * @param {{name: string, value: any}[]} choice
   * @returns
   */
  static async search(message, choice) {
    let value;

    value = await search({
      message: message,
      source: async (input) => {
        if (!input) {
          return choice.map(i=>i);
        }

        return choice.filter((i) =>
          i.toLowerCase().includes(input.toLowerCase())
        );
      },
    });
    return value;
  }
}
