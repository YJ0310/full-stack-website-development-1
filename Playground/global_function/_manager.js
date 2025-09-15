import * as common from "./common/_manager.js";
import { Example_data as data, New_Example_Data } from "./data/example_data.js";
import { File_system as fs } from "./filesystem/filesystem.js";
import { inquirer } from "./inquirer/inquirer.js";
import { search_file } from "./filesystem/search_file.js";
import { Mongo } from "./mongo/mongo.js";
import function_handler from "./function_handler/_manager.js";

const inquirer_methods = {
  input: inquirer.input,
  select: inquirer.select,
  checkbox: inquirer.checkbox,
  confirm: inquirer.confirm,
  password: inquirer.password,
  press_any_key_to_continue: inquirer.press_any_key_to_continue,
  search: inquirer.search,
};

export default {
  common,
  data,
  fs,
  inquirer: inquirer_methods,
  Mongo,
  search_file,
  function_handler,
  New_Example_Data,
};