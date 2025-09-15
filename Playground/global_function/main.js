import { clear } from "./common/console_clear.js";
import { Command_Handler } from "./handler/command_handler.js";
import global from "./_manager.js";
import { Mongo } from "./mongo/mongo.js";

const start = async () => {
  // clear the terminal
  clear();

  // print the date as log
  console.log(Date());

  let continue_loop = true;

  let mongo = await new global.Mongo().connect();

  while (continue_loop === true) {
    await playground(mongo);

    // ask to continue or stop
    if (await global.inquirer.confirm("Continue?", false)) {
      continue_loop = true;
    } else {
      continue_loop = false;
    }
  }

  await mongo.close();

  return global.inquirer.press_any_key_to_continue();
};

/**
 *
 * @param {Mongo} mongo
 * @returns
 */
const playground = async (mongo) => {
  // declare the value

  let value;

  value = await mongo.menu(mongo);
  // value = await mongo.reset_the_data();

  // value = await global.New_Example_Data.init_pre_u();

  console.log(value);

  return;
};

const test = async () => {
  let value = await global.inquirer.search(
    "test",
    (await global.New_Example_Data.init_person()).map(i=>i.Name)
  );

  console.log(value);
};

start();
// test();
