import { execSync } from "child_process";

export const clear = () => {
  execSync("cls", { stdio: "inherit" });
};
