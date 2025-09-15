import global from "../../../global_function/_manager.js";
import fs from "fs/promises";

export { global };

const start_function = async () => {
  await global.common.console_clear.clear();

  const mongo = await new global.Mongo().connect();

  let value = await global.function_handler.get_file("function");

  
  value = await global.function_handler.restucture(value);

  value = await global.function_handler.select_function(value);

  console.log(value);

  await record(value);

  await mongo.close();
};

const record = async (parameter) => {
  await fs.appendFile(
    "C:/Users/yinji/Documents/VS_code/Full_Stack_Website_Developer/Playground/tutorial/tutorial4/example3/result.log",
    `\n\n\n[${new Date()}]\n` + JSON.stringify(parameter)
  );
};

start_function();
