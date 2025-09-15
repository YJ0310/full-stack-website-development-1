import path, { dirname, join, resolve } from "path";
import global from "../_manager.js";
import fs from "fs/promises";
import { pathToFileURL } from "url";
import { Execute_File_Template } from "./execute_file_class.js";

/**@param {string} path - path of the folder*/
export const get_file = async (path) => {
  let filepath;
  /**
   * @type {{name:string, folder: {name:string, file: Execute_File_Template[]}[]}[]}
   */
  let value;

  filepath = path;

  value = await fs.readdir(filepath);

  for (let index = 0; index < value.length; index++) {
    /**
     * @type {{name: string, folder: Execute_File_Template[]}}
     */
    let folder_set = { name: "", folder: [] };

    folder_set.name = value[0];

    folder_set.folder = (await fs.readdir(join(filepath, value[0]))).filter(
      (i) => i.endsWith(".js")
    );

    for (let index2 = 0; index2 < folder_set.folder.length; index2++) {
      /**
       * @type {Execute_File_Template}
       */
      let file = (
        await import(
          pathToFileURL(join(filepath, value[0], folder_set.folder.at(0)))
        )
      ).default;

      folder_set.folder.push(file);

      folder_set.folder.shift();
    }

    value.push(folder_set);

    value.shift(value);
  }

  return value;
};
