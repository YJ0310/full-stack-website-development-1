import { Command } from "./handler/command_handler.js";

export const command = new Command({
    command_name: "Hello World",
    execute () {
        return "Hello World"
    }
})