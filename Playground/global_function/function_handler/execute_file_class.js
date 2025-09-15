/**
 * @typedef {Object} ExecuteFileOptions
 * @property {string} name - The name of the file.
 * @property {string[]} [alias=[]] - Optional aliases.
 * @property {Function} execute - A function to be executed.
 * @property {string[]} call_name
 */

export class Execute_File_Template {
  /**
   *
   * @param {ExecuteFileOptions} options
   */
  constructor({ name, alias = [], execute }) {
    this.name = name;
    if (alias.length > 0) {
      this.alias = alias;
    }
    this.execute = execute;
    this.call_name = [];
  }

  /**
   * 
   * @param {string} name 
   */
  add_call_name (name) {
    this.call_name.push(name)
  }
}
