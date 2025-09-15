import fs from "fs/promises";

export class File_system {
  constructor() {}
  /**
   *
   * @param {string[]} folder_name_list
   * @returns
   */
  static async get_folder_name(folder_name_list) {
    const file_name_list = folder_name_list
    for (let index = 0; index < file_name_list.length; index++) {
      let directory = (await fs.stat(file_name_list[0])).isDirectory();
      if (directory === true) {
        file_name_list.push(file_name_list[0]);
      } else {
        file_name_list.push("");
      }
      file_name_list = file_name_list.slice(1);
    }
    file_name_list = file_name_list.filter((i) => i !== "");
    return file_name_list;
  }

  /**
   * 
   * @param {string} dirname 
   * @returns 
   */
  static async readdir(dirname){
    return fs.readdir(dirname);
  }

  
}
