import global from "../_manager.js";
import { Execute_File_Template } from "./execute_file_class.js";

export const select_function = async (parameter) => {
  /**
   * @type {Execute_File_Template[]}
   */
  let functionList = parameter;

  /**@type {{name:string, value:string}[]} */
  let function_name = [];

  functionList.map((i) => {
    i.call_name.map((j) => {
      function_name.push({ name: j, value: i.name });
    });
  });


  /**@type {string} */
  let selectedFunction = await global.inquirer.search("Please select a function", function_name);

  let executed_function_result = await functionList.find(i=>i.name===selectedFunction).execute();

  return executed_function_result;
};
