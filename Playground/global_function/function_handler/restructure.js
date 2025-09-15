import { Execute_File_Template } from "./execute_file_class.js";

export const restucture = async (parameter) => {
  /**
   * @type {{name: string, folder: Execute_File_Template[]}[]}
   */
  let value = parameter;

  /**
   * @type {Execute_File_Template[]}
   */
  let value2 = [];

  for (let index = 0; index < value.length; index++) {
    value.at(index).folder.forEach((file) => {
      file.add_call_name(`${value.at(index).name}/${file.name}`);
      if (file.alias) {
        for (let i = 0; i < file.alias.length; i++) {
          file.add_call_name(
            `${value.at(index).name}/${file.alias.at(i)}`
          );
        }
      }
      value2.push(file);
    });
  }

  return value2;
};
