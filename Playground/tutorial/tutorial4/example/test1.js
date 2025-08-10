import Readline from "readline/promises";
import { stdin, stdout } from "process";
import { global_data_generation } from "./example_data_generator.js";
import inquirer from "inquirer";

const count = () => {
  console.log(`My waifu: ${my_waifu.data.length}`);
};

const ask = async (question) => {
  const readline = Readline.createInterface(stdin, stdout);
  const answer = await readline.question(question + "\n");
  readline.close();
  return answer;
};

/**
 *
 * @param {string} message
 * @param {string[]} choice
 * @returns answer
 */
const ask_in_list = async (message, choice) => {
  const answer = await inquirer.prompt([
    {
      type: `list`,
      name: `choice`,
      message: message,
      choices: choice,
    },
  ]);
  return answer;
};

/**
 *
 * @param {number} time in unit seconds
 */
const delay = async (time = 1) => {
  setTimeout(() => {
    return;
  }, time * 1000);
};


/**
 * 
 * @param {string} type_you_want_to_ask 
 * @param {global_data_generation_jsdoc.data} data
 */
const ask_for_options = async (data, type_you_want_to_ask) => {
  const list = {
    before: data.map(i=>i[type_you_want_to_ask]),
    after: [],
  };
  list.after = [... new Set(list.before)].sort();

  const answer = await ask_in_list(`Please select ${type_you_want_to_ask}:`, list.after);
  console.log(answer.choice)
  return answer.choice
};

const my_waifu = new global_data_generation();
my_waifu.my_potential_wife();
my_waifu.data = my_waifu.data
  .sort((a, b) => a.age - b.age || a.name - b.name)
  .filter((i) => i.potential_waifu == true);

count();
delay();
ask_for_options(my_waifu.data,`name`)

// console.table(my_waifu.data);
