import { MongoDB_operation } from "./mongo_db_operation.js";

const mongo_db_operation = new MongoDB_operation();
mongo_db_operation.init().then(async () => {
  await mongo_db_operation.find_operation.init();
  let stopper = false;
  while (stopper == false) {
    await run();
    // stopper = await mongo_db_operation.prompt.continue();
    stopper = true
  }
  await mongo_db_operation.close();
});

const run = async () => {
  const answer = await mongo_db_operation.find_operation.find_with_asking_select_specific_fields()
  console.table(answer);
};
