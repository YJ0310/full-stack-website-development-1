import { join } from "path";
import manager from "../_manager.js";
import fs from "fs/promises";

export const search_file = async (dirname = import.meta.dirname) => {
  let file_name;
  let folders = new Map();
  let files = [];
  file_name = (await manager.fs.readdir(dirname)).filter(
    (i) => !["node_modules", "package-lock.json", "package.json"].includes(i)
  );
  for (let index = 0; index < file_name.length; index++) {
    const element = file_name[index];
    const stat = await fs.stat(join(dirname, element));
    if (stat.isDirectory() === true) {
      folders.set(
        element,
        Object.values(await search_file(await join(dirname, element))).at(0)
      );
    } else {
      files.push(element);
    }
    folders.set(dirname.split("\\").at(-1), files);
  }
  return Object.fromEntries(folders);
};
